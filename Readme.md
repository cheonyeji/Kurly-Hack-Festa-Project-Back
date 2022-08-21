# Route

## Global

- / -> Home

## User (Kurly)

### (:id부분은 모두 시나리오상 생략)

- /user/order -> 주문 리스트

[x] GET /user/order/:ordernum -> 특정 주문 상세 (주문번호 기준) -> 필요없음???

- POST /user/order/:ordernum -> 특정 주문 cs 접수
  (사진uri, title, content, category)

- GET 배송완료 버튼 클릭 시 기사 채팅 내역, 기사 보낸 사진
  ()

## Delivery (KurlyVery)

### (:id부분은 모두 시나리오상 생략)

- /delivery/msg/todo -> 미배송 리스트
- /delivery/msg/done -> 배송완료 리스트
  [x] GET /delivery/msg/todo/:trackingnum -> 특정 미배송 상세 (송장번호 기준) -> 필요없음
- POST /delivery/msg/todo/1/:trackingnum -> 송장번호 메시지 전송 - (미배송->배송완료)
- POST /delivery/msg/todo/2/:trackingnum -> 송장번호 메시지 전송 - (미배송->배송지연)
  (사진uri, 기사채팅, 배달사진)

- /delivery/cs/todo -> 오배송 리스트
- /delivery/cs/done -> 오배송 처리완료 리스트
  [x] GET /delivery/cs/todo/:trackingnum -> 특정 오배송 상세 (송장번호 기준) -> 오배송리스트 줄때 싹 다 주기
- POST /delivery/cs/todo/:trackingnum -> 송장번호 메시지 전송 (오배송->배송완료)

- GET /delivery/:trackingnum -> 운송장 기준 채팅내역

# DB Schema 설계
