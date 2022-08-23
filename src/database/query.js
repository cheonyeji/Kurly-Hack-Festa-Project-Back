//////// userController
export const getOrderItemsQuery =
  "SELECT * FROM `order` order by `order_date` desc";
export const getOrdernumItemQuery =
  "SELECT `temperature`, `tracking_num`, `delivered_date`, `tracking_status` FROM `delivery` WHERE `order_num` =?";

// cs 테이블에 운송장번호 없을 때 쿼리
// export const setCSOrdernumItemQuery =
//   "INSERT INTO `cs` (`order_num`,`img_uri`,`request_title`,`request_content`,`request_category`,`completed`) VALUES(?,?,?,?,?,?)";

export const setCSOrdernumItemQuery =
  "INSERT INTO `cs` (`order_num`,`img_uri`,`request_title`,`request_content`,`request_category`,`completed`, `tracking_num`) values (?, ?, ?, ?, ?, ?, (select `tracking_num` from `delivery` where `delivery`.`temperature` = ? and `delivery`.`order_num` = ?))";

//////// msgController
export const getDeliveryToDosQuery =
  "SELECT `delivery`.`tracking_num`, `delivery`.`receiver`, `delivery`.`address`, `delivery`.`user_request`, `user`.`phone_num`, `delivery`.`order_num` FROM `delivery` join `user` on `delivery`.`user_id` = `user`.`id`";

export const getDeliveryDonesQuery =
  "SELECT `delivery`.`tracking_num`, `delivery`.`receiver`, `delivery`.`address`, `delivery`.`user_request`, `user`.`phone_num`, `delivery`.`delivered_date`, `delivery`.`order_num` FROM `delivery` join `user` on `delivery`.`user_id` =  `user`.`id` where `delivery`.`delivered_date` is not null";

const insertIfNotExits =
  "INSERT IGNORE INTO `header` (`tracking_num`, `from_id`, `to_id`) select `tracking_num`, `kurlyvery_id`, `user_id` from `kurylyDB`.`delivery` where `tracking_num` = ? ; ";
const saveChatting =
  "INSERT INTO `message` (`text`,`tracking_num`,`img_uri`,`is_first_msg`) VALUES (?,?,?,?); ";
const updateToStatusTwo =
  "UPDATE `delivery` SET `tracking_status` = 2 WHERE `tracking_num` = ?; ";
// 해당 운송장 메시지 마지막 발송 날짜 기준으로 배송완료 시간 저장 (최초 날짜로 하면 배송지연 메세지랑 구분이 안됨)
const updateToStatusThree =
  "UPDATE `delivery` SET `delivered_date` = (select `time` from `message` where `tracking_num` = ? order by `time` desc limit 1), `tracking_status` = 3 WHERE `tracking_num` = ?; ";

// 주문상태도 업데이트해줘야 함
const updateOrderStatusToTwo =
  "update `kurylyDB`.`order` set `order_status`=2 where `order_num` = ?;";

const updateOrderStatusToThree =
  "update `order` set `order_status`= IF((select count(`tracking_status`) from `delivery` where (`order_num` = ? and `tracking_status` != 3)) = 0, 3, `order_status`)  where `order_num` = ?";

export const updateDeliveryToDoItemToStatusTwoQuery =
  insertIfNotExits + saveChatting + updateToStatusTwo + updateOrderStatusToTwo;
export const updateDeliveryToDoItemToStatusThreeQuery =
  insertIfNotExits +
  saveChatting +
  updateToStatusThree +
  updateOrderStatusToThree;

//////// csController
export const getCSToDosQuery =
  "SELECT * FROM `cs` where `completed` = 0 order by `request_date` desc";
export const getCSDonesQuery =
  "SELECT * FROM `cs` where `completed` = 1` order by `request_date` desc";

const setCSItemCompleted = "UPDATE `cs` SET `completed` = 1 where `cs_id` = ?";

// 채팅 이력 저장, 배송완료 일자 업데이트(배송상태 이미 3번이지만 또), cs 테이블 completed=1
export const updateCSTodoItemToStatusThreeQuery =
  saveChatting + updateToStatusThree + setCSItemCompleted;

// loginController
export const userLoginQuery =
  "UPDATE `user` SET `device_token` = ? WHERE `id` = ?";
export const kurlyveryLoginQuery =
  "UPDATE `kurlyvery` SET `device_token` = ? WHERE `id` = ?";

// 냅둬보기 일단
export const getDeliveryToDoItemQuery =
  "SELECT `delivery`.`tracking_num`, `delivery`.`receiver`, `delivery`.`address`, `delivery`.`user_request`, `user`.`phone_num` FROM `delivery` join `user` on `delivery`.`user_id` = `user`.`id` where `delivery`.`tracking_num` = ?";

export const updateDeliveryToDoItemQuery = "";