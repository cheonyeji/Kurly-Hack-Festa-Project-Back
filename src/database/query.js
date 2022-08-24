//////// userController

// GET /user/order -> 주문 리스트
export const getOrderItemsQuery =
  "SELECT * FROM `order` order by `order_date` desc";

// GET /user/order/:ordernum -> 특정 주문 상세
export const getOrdernumItemQuery =
  "SELECT `temperature`, `tracking_num`, `delivered_date`, `tracking_status` FROM `delivery` WHERE `order_num` =?";

// POST /user/order/:ordernum -> 특정 주문 cs 접수 & 푸쉬
const registerCS =
  "INSERT INTO `cs` (`order_num`,`img_uri`,`request_title`,`request_content`,`request_category`,`completed`, `tracking_num`) values (?, ?, ?, ?, ?, ?, (select `tracking_num` from `delivery` where `delivery`.`temperature` = ? and `delivery`.`order_num` = ?)); ";
const returnKurlyveryToken =
  "SELECT `device_token` FROM `kurlyvery` where `id`='testvery01'";
export const setCSOrdernumItemAndReturnTokenQuery =
  registerCS + returnKurlyveryToken;

// GET /user/order/:ordernum/0~2 -> 해당주문번호 상온~냉장 운송장 배송완료 메시지
// 배송완료 메시지는 무조건 사진+text로 저장되어 가장 최신순 하나만 select
export const getChattingHistoryByTempQuery =
  "select `text`, `img_uri` from `message` where `tracking_num` = (select `tracking_num` from `delivery` where `order_num`=? and `temperature` = ?) order by `time` desc limit 1";

//////// msgController
// GET /delivery/msg/todo -> 미배송 리스트
export const getDeliveryToDosQuery =
  // 따로 정렬 X
  //"SELECT `tracking_num`, `receiver`, `address`, `user_request`, `phone_num`, `order_num` FROM `delivery` where `delivered_date` is null";
  // 주문일자 기준 정렬한 결과 (오래된 일자 먼저)
  // "SELECT `tracking_num`, `receiver`, `address`, `user_request`, `phone_num`, `delivery`.`order_num`, `order`.`order_date` FROM `delivery` join `order` on `delivery`.`order_num` = `order`.`order_num` where `delivered_date` is null order by  `order`.`order_date` asc";
  // 주문일자는 출력하지 않으며 정렬은 함
  "SELECT `tracking_num`, `receiver`, `address`, `user_request`, `phone_num`, `delivery`.`order_num` FROM `delivery` join `order` on `delivery`.`order_num` = `order`.`order_num` where `delivered_date` is null order by  `order`.`order_date` asc";

// GET /delivery/msg/done -> 배송완료 리스트 (배송날짜 기준 최신순)
export const getDeliveryDonesQuery =
  "SELECT `tracking_num`, `receiver`, `address`, `user_request`,`phone_num`, `delivered_date`, `order_num` FROM `delivery` where `delivered_date` is not null order by `delivered_date` desc";
// 주문번호 기준 정렬한 결과 (오래된 일자 먼저)
// "SELECT `tracking_num`, `receiver`, `address`, `user_request`,`phone_num`, `delivered_date`, `delivery`.`order_num`, `order`.`order_date`FROM `delivery` where `delivered_date` is not null";

// 운송장기준 최초 채팅인 경우에만 insert
const insertIfNotExits =
  "INSERT IGNORE INTO `header` (`tracking_num`, `from_id`, `to_id`) select `tracking_num`, `kurlyvery_id`, `user_id` from `kurylyDB`.`delivery` where `tracking_num` = ? ; ";

// 채팅 이력 저장
const saveChatting =
  "INSERT INTO `message` (`text`,`tracking_num`,`img_uri`,`is_first_msg`) VALUES (?,?,?,?); ";

// 운송장 기준 배송상태 -> 2 (배송지연) 업데이트
const updateToStatusTwo =
  "UPDATE `delivery` SET `tracking_status` = 2 WHERE `tracking_num` = ?; ";

// 해당 운송장 메시지 마지막 발송 날짜 기준으로 배송완료 시간 저장 (최초 날짜로 하면 배송지연 메세지랑 구분이 안됨)
const updateToStatusThree =
  "UPDATE `delivery` SET `delivered_date` = (select `time` from `message` where `tracking_num` = ? order by `time` desc limit 1), `tracking_status` = 3 WHERE `tracking_num` = ?; ";

// order table의 order_status -> 2 (배송지연) 업데이트
const updateOrderStatusToTwo =
  "update `kurylyDB`.`order` set `order_status`=2 where `order_num` = ?;";

// order table의 order_status -> 3 (배송완료) 업데이트
const updateOrderStatusToThree =
  "update `order` set `order_status`= IF((select count(`tracking_status`) from `delivery` where (`order_num` = ? and `tracking_status` != 3)) = 0, 3, `order_status`)  where `order_num` = ?; ";

const returnUserToken =
  "SELECT `device_token` FROM `user` where `id`='testuser01'";

// POST /delivery/msg/todo/2/:trackingnum -> 송장번호 메시지 전송 (미배송->배송지연) & 푸쉬알림
export const updateDeliveryToDoItemToStatusTwoAndRetrunTokenQuery =
  insertIfNotExits +
  saveChatting +
  updateToStatusTwo +
  updateOrderStatusToTwo +
  returnUserToken;

// POST /delivery/msg/todo/3/:trackingnum -> 송장번호 메시지 전송 (미배송->배송완료) & 푸쉬알림
export const updateDeliveryToDoItemToStatusThreeAndRetrunTokenQuery =
  insertIfNotExits +
  saveChatting +
  updateToStatusThree +
  updateOrderStatusToThree +
  returnUserToken;

//////// csController

// GET /delivery/cs/todo -> 오배송 리스트 (cs접수날짜 기준 최신순 정렬)
export const getCSToDosQuery =
  "SELECT `cs`.`order_num`, `cs`.`img_uri`, `cs`.`request_title`, `cs`.`request_content`, `cs`.`request_category`, `cs`.`cs_id`, `cs`.`request_date`, `cs`.`tracking_num`, `delivery`.`receiver`, `delivery`.`address`, `delivery`.`phone_num` FROM `cs` join `delivery` on `delivery`.`tracking_num` =  `cs`.`tracking_num` where `cs`.`completed` = 0 order by `cs`.`request_date` desc";

// GET /delivery/cs/done -> 오배송 처리완료 리스트 (배송완료날짜 기준 최신순 정렬)
export const getCSDonesQuery =
  "SELECT `cs`.`order_num`, `cs`.`img_uri`, `cs`.`request_title`, `cs`.`request_content`, `cs`.`request_category`, `cs`.`cs_id`, `cs`.`request_date`, `cs`.`tracking_num`, `delivery`.`receiver`, `delivery`.`address`, `delivery`.`phone_num`, `delivery`.`delivered_date` FROM `cs` join `delivery` on `delivery`.`tracking_num` =  `cs`.`tracking_num` where `cs`.`completed` = 1 order by `delivery`.`delivered_date` desc";
// cs접수날짜 기준 최신순 정렬하는 쿼리
//"SELECT `cs`.`order_num`, `cs`.`img_uri`, `cs`.`request_title`, `cs`.`request_content`, `cs`.`request_category`, `cs`.`cs_id`, `cs`.`request_date`, `cs`.`tracking_num`, `delivery`.`receiver`, `delivery`.`address`, `delivery`.`phone_num` FROM `cs` join `delivery` on `delivery`.`tracking_num` =  `cs`.`tracking_num` where `cs`.`completed` = 1 order by `cs`.`request_date` desc";

// cs_id 기준 해당 cs접수건 completed=1 업데이트 (처리완료)
const setCSItemCompleted =
  "UPDATE `cs` SET `completed` = 1 where `cs_id` = ?; ";

// POST /delivery/cs/todo/:trackingnum -> 송장번호 메시지 전송 & 푸쉬알림
// 채팅 이력 저장, 배송완료 일자 업데이트(배송상태 이미 3번이지만 또), cs 테이블 completed=1
export const updateCSTodoItemToStatusThreeAndReturnTokenQuery =
  saveChatting + updateToStatusThree + setCSItemCompleted + returnUserToken;

//////// loginController
// POST /user/login -> User Login (유저) (id : testuser01 고정)
export const userLoginQuery =
  "UPDATE `user` SET `device_token` = ? WHERE `id` = ?";

// POST /delivery/login -> Kurlyvery Login (기사) (id : testvery01 고정)
export const kurlyveryLoginQuery =
  "UPDATE `kurlyvery` SET `device_token` = ? WHERE `id` = ?";

// chattingController.js
// GET /delivery/:trackingnum -> 운송장 기준 채팅내역 (오래된 날짜 우선)
export const getChattingHistoryQuery =
  "SELECT `text`, `img_uri`, `time`, `is_first_msg` FROM `message` where `tracking_num` = ? order by `time` asc;";
