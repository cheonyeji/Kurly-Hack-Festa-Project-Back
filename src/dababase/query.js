export const getOrderItemsQuery = "SELECT * FROM `order`";
export const getOrdernumItemQuery =
  "SELECT `temperature`, `tracking_num`, `delivered_date`, `tracking_status` FROM `delivery` WHERE `order_num` =?";

export const setCSOrdernumItemQuery =
  "INSERT INTO `cs` (`order_num`,`img_uri`,`request_title`,`request_content`,`request_category`,`completed`) VALUES(?,?,?,?,?,?)";
