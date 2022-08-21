# Route

## Global

- / -> Home

## User (Kurly)

### (:id부분은 모두 시나리오상 생략)

- /user/order -> 주문 리스트

- GET /user/order/:ordernum -> 특정 주문 상세 (주문번호 기준)
- POST /user/order/:ordernum -> 특정 주문 cs 접수

## Delivery (KurlyVery)

### (:id부분은 모두 시나리오상 생략)

- /delivery/msg/todo -> 미배송 리스트
- /delivery/msg/done -> 배송완료 리스트
- GET /delivery/msg/todo/:trackingnum -> 특정 미배송 상세 (송장번호 기준)
- POST /delivery/msg/todo/:trackingnum -> 송장번호 메시지 전송 - (미배송->배송완료)

- /delivery/cs/todo -> 오배송 리스트
- /delivery/cs/done -> 오배송 처리완료 리스트
- GET /delivery/cs/todo/:trackingnum -> 특정 오배송 상세 (송장번호 기준)
- POST /delivery/cs/todo/:trackingnum -> 송장번호 메시지 전송 - (오배송->배송완료)
