# Route

### 로그인

[V]- POST /user/login -> User Login (유저) (id : testuser01 고정)
(body에 device_token 값 넣어서 보내주세요)

[V]- POST /delivery/login -> Kurlyvery Login (기사) (id : testvery01 고정)
(body에 device_token 값 넣어서 보내주세요)

## User (Kurly)

(:id부분은 모두 시나리오상 생략)

## enum

[ status ]
0 주문접수 (미배송)
1 배송중
2 배송지연
3 배송완료

[ temperature ]
room 상온
refrigerating 냉장
freezing 냉동

### 주문 내역 관련 (user, 기존 마켓컬리 앱)

[V]- GET /user/order -> 주문 리스트 --> res.send (주문일자, 주문번호, 주문상품, 결제방법 결제금액, 주문상태, 주문유저id object 배열 )

- 예시
  [ {
  "order_date": "2022-07-29T20:16:23.000Z",
  "order_num": "3433344",
  "order_product": "[KF365] DOLE 실속 바나나 1kg (필리핀)",
  "pay_by": "신용카드",
  "pay_price": 2900,
  "order_status": 0,
  "user_id": "cheonyeji"
  }, { ... }, { ... } ]

[V]- GET /user/order/:ordernum -> 특정 주문 상세 --> res.send(주문번호 기준으로 (상온/냉장/냉동 값, 배송완료날짜, 운송장, 상태 object 배열 )

- 예시
  [{
  "temperature": "refrigerating",
  "tracking_num": "220-W0-227233424-03",
  "delivered_date": "2022-08-21T19:20:00.000Z",
  "tracking_status": 1
  }, {...} ]

(미배송인 경우 배송완료 날짜 값 null)
(temperature 값은 room / refrigerating / freezing. 상온/ 냉장/ 냉동)

[V]- POST /user/order/:ordernum -> 특정 주문 cs 접수 & 푸쉬
(form-data 형식으로 img_uri title, content, category, temperature 넘겨주세요)

(8/23 냉장/냉동/상온 중 어느 요소가 체크된건지 temperature 추가 )

### 채팅 관련

[V]- 배송완료 버튼 클릭 시 기사 채팅 내역, 기사 보낸 사진 보내줘야 함

- GET /user/order/:ordernum/0 -> 해당주문번호 상온 운송장 배송완료 메시지
- GET /user/order/:ordernum/1 -> 해당주문번호 냉장 운송장 배송완료 메시지
- GET /user/order/:ordernum/2 -> 해당주문번호 냉동 운송장 배송완료 메시지
  (냉동/냉장/상온 중 어떤 요소가 클릭되었는지 알아야... 채팅 내역을 부를 수 있음)

- 예시
  [
  {
  "text": "고객님 배송 완료 했습니다^^",
  "img_uri": "https://kurlyvery-img-s3.s3.ap-northeast-2.amazonaws.com/1661274670703-1661267293090-rn_image_picker_lib_temp_bf0b248d-647e-4aa4-8ecd-42dfabbd27f0.jpg"
  }
  ]

## Delivery (KurlyVery)

### (:id부분은 모두 시나리오상 생략)

[v]- GET /delivery/msg/todo -> 미배송 리스트
(운송장번호, 주소, 고객명, 전화번호, 요청사항, 주문번호)
(정렬기준 : 주문일자 기준)

- 예시
  [
  {
  "tracking_num": "220-W0-227233424-0002",
  "receiver": "서맹구",
  "address": "서울 강서구 아파트 2110호",
  "user_request": "초인종을 눌러주세요",
  "phone_num": "010-9999-9999",
  "order_num": "343432321"
  }, {...}
  ]

[v]- GET /delivery/msg/done -> 배송완료 리스트 (배송완료날짜 기준 최신순)
(운송장번호, 주소, 고객명, 전화번호, 요청사항, 배송완료날짜, 주문번호)

- 예시
  [
  {
  "tracking_num": "220-W0-227233424-03",
  "receiver": "서맹구",
  "address": "서울 강서구 아파트 2110호",
  "user_request": "초인종을 눌러주세요",
  "phone_num": "010-9999-9999",
  "delivered_date": "2022-08-21T19:20:00.000Z",
  "order_num": "343432321"
  }
  ]

[v]- POST /delivery/msg/todo/2/:trackingnum -> 송장번호 메시지 전송 - (미배송->배송지연) & 푸쉬알림
[v]- POST /delivery/msg/todo/3/:trackingnum -> 송장번호 메시지 전송 - (미배송->배송완료) & 푸쉬알림
(form-data형식으로 text, img_uri, is_first_msg, order_num 넣어서 보내주세요.)
(\* 배송완료로 바뀌면서 기사가 보낸 채팅 이력 중 가장 마지막 시간 기준으로 배송완료일자 update됨)

[v]- GET /delivery/cs/todo -> 오배송 리스트 (cs접수날짜 기준 최신순 정렬)

- 예시
  [
  {
  "order_num": "343432321",
  "img_uri": null,
  "request_title": "Test",
  "request_content": "Sssssdedsdd",
  "request_category": "배송 상품이 안 왔어요",
  "cs_id": 71,
  "request_date": "2022-08-23T09:36:02.000Z",
  "tracking_num": "220-W0-227233424-0002",
  "receiver": "서맹구",
  "address": "서울 강서구 아파트 2110호",
  "phone_num": "010-9999-9999"
  }
  ]

[v]- GET /delivery/cs/done -> 오배송 처리완료 리스트 (배송완료 기준 최신순 정렬)

- 예시
  [
  {
  "order_num": "343432321",
  "img_uri": "",
  "request_title": "상품이 안보여요",
  "request_content": "이제는 운송장이 떠야함요",
  "request_category": "상품이 다른곳으로 갔어요",
  "cs_id": 70,
  "request_date": "2022-08-23T04:47:34.000Z",
  "tracking_num": "220-W0-227233424-0002",
  "receiver": "서맹구",
  "address": "서울 강서구 아파트 2110호",
  "receiver_phone": "010-9999-8253"
  }
  ]

[v]- POST /delivery/cs/todo/:trackingnum -> 송장번호 메시지 전송 (오배송->배송완료) & 푸쉬알림
(form-data형식으로 text, img_uri, is_first_msg, cs_id, order_num 넣어서 보내주세요)

[V]- GET /delivery/:trackingnum -> 운송장 기준 채팅내역 (오래된 날짜 우선)
(운송장 기반 text, img_uri, is_first_msg, time 넘어와요)
[
{
"text": "고객님 발송이 지연되고 있어 죄송합니다",
"img_uri": null,
"time": "2022-08-23T06:43:36.000Z",
"is_first_msg": 1
}, { ... }
]
