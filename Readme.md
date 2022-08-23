# Route

### 로그인

[v]- POST /user/login -> User Login (유저)
(body에 id, device_token 값 넣어서 보내주세요)

[v]- POST /delivery/login -> Kurlyvery Login (기사)
(body에 id, device_token 값 넣어서 보내주세요)

## User (Kurly)

(:id부분은 모두 시나리오상 생략)

## enum

[ status ]
0 주문접수 (미배송)
1 배송중
2 배송지연
3 배송완료

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

[V]- POST /user/order/:ordernum -> 특정 주문 cs 접수
(body에 json형식으로 img_uri, title, content, category, temperature 넘겨주세요)
(8/23 냉장/냉동/상온 중 어느 요소가 체크된건지 temperature 추가 )

### 채팅 관련

- 배송완료 버튼 클릭 시 기사 채팅 내역, 기사 보낸 사진 보내줘야 함
  - GET /user/order/:ordernum/0 -> 해당주문번호 상온 운송장 채팅이력
  - GET /user/order/:ordernum/1 -> 해당주문번호 냉장 운송장 채팅이력
  - GET /user/order/:ordernum/2 -> 해당주문번호 냉동 운송장 채팅이력
    (냉동/냉장/상온 중 어떤 요소가 클릭되었는지 알아야... 채팅 내역을 부를 수 있음)

## Delivery (KurlyVery)

### (:id부분은 모두 시나리오상 생략)

[v]- GET /delivery/msg/todo -> 미배송 리스트
(운송장번호, 주소, 고객명, 전화번호, 요청사항)

- 예시
  [
  {
  "tracking_num": "220-W0-227233424-0002",
  "receiver": "서수민",
  "address": "서울 강서구 아파트 2110호",
  "user_request": "초인종을 눌러주세요",
  "phone_num": "010-9246-8253"
  }, {...}
  ]

[v]- GET /delivery/msg/done -> 배송완료 리스트

- 예시
  [
  {
  "tracking_num": "220-W0-227233424-03",
  "receiver": "서수민",
  "address": "서울 강서구 아파트 2110호",
  "user_request": "초인종을 눌러주세요",
  "phone_num": "010-9246-8253",
  "delivered_date": "2022-08-21T19:20:00.000Z"
  }
  ]

- POST /delivery/msg/todo/2/:trackingnum -> 송장번호 메시지 전송 - (미배송->배송지연)
- POST /delivery/msg/todo/3/:trackingnum -> 송장번호 메시지 전송 - (미배송->배송완료)
  (body에 text, img_uri, is_first_msg 넣어서 보내주세요. 만약 img/text 비어있으면 빈 문자열로)

[v]- GET /delivery/cs/todo -> 오배송 리스트

- 예시
  [
  {
  "order_num": "343432321",
  "img_uri": "",
  "request_title": "상품이 안보여요",
  "request_content": "이제는 운송장이 떠야함요",
  "request_category": "상품이 다른곳으로 갔어요",
  "completed": 0,
  "id": 70,
  "request_date": "2022-08-23T04:47:34.000Z",
  "tracking_num": "220-W0-227233424-0002"
  }
  ]

[v]- GET /delivery/cs/done -> 오배송 처리완료 리스트

- 예시 : GET /delivery/cs/todo 와 동일

- POST /delivery/cs/todo/:trackingnum -> 송장번호 메시지 전송 (오배송->배송완료)

- GET /delivery/:trackingnum -> 운송장 기준 채팅내역
