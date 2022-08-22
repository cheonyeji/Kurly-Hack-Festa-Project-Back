# Route

## Global

- / -> Home

## User (Kurly)

### (:id부분은 모두 시나리오상 생략)

- GET /user/order -> 주문 리스트 --> res.send (주문일자, 주문번호, 주문상품, 결제방법, 결제금액, 주문상태, 주문유저id object 배열 )

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

- GET /user/order/:ordernum -> 특정 주문 상세 --> res.send(주문번호 기준으로 (상온/냉장/냉동 값, 배송완료날짜, 운송장 object 배열 )

  - 예시
    [{
    "temperature": "refrigerating",
    "tracking_num": "220-W0-227233424-03",
    "delivered_date": "2022-08-21T19:20:00.000Z"
    }, {...} ]

  (미배송인 경우 배송완료 날짜 값 null)
  (temperature 값은 room / refrigerating / freezing. 상온/ 냉장/ 냉동)

- POST /user/order/:ordernum -> 특정 주문 cs 접수
  (body에 json형식으로 img_uri, title, content, category 넘겨주세요)
- GET /user/order/:ordernum/0 -> 해당주문번호 상온 운송장 채팅이력
- GET /user/order/:ordernum/1 -> 해당주문번호 냉장 운송장 채팅이력
- GET /user/order/:ordernum/2 -> 해당주문번호 냉동 운송장 채팅이력
- GET 배송완료 버튼 클릭 시 기사 채팅 내역, 기사 보낸 사진
  (냉동/냉장/상온 중 어떤 요소가 클릭되었는지 알아야... 채팅 내역을 부를 수 있음)

## Delivery (KurlyVery)

### (:id부분은 모두 시나리오상 생략)

- /delivery/msg/todo -> 미배송 리스트
  (운송장번호, 주소, 고객명, 전화번호, 요청사항)

- /delivery/msg/done -> 배송완료 리스트
- POST /delivery/msg/todo/1/:trackingnum -> 송장번호 메시지 전송 - (미배송->배송완료)
- POST /delivery/msg/todo/2/:trackingnum -> 송장번호 메시지 전송 - (미배송->배송지연)
  (배달사진uri, 기사채팅)

- /delivery/cs/todo -> 오배송 리스트
- /delivery/cs/done -> 오배송 처리완료 리스트
- POST /delivery/cs/todo/:trackingnum -> 송장번호 메시지 전송 (오배송->배송완료)

- GET /delivery/:trackingnum -> 운송장 기준 채팅내역

# DB Schema 설계
