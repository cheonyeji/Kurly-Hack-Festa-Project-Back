import { getConnectionPool } from "../database/db";
import {
  getDeliveryDonesQuery,
  getDeliveryToDosQuery,
  updateDeliveryToDoItemToStatusThreeQuery,
  updateDeliveryToDoItemToStatusTwoQuery,
} from "../database/query";

export const getDeliveryToDos = (req, res) => {
  getConnectionPool(async (connection) => {
    try {
      let [rows] = await connection.query(getDeliveryToDosQuery);
      connection.release();
      return res.send(rows);
    } catch (err) {
      console.log("Query Error", err);
      connection.release();
      return res.send(err);
    }
  });
};
export const getDeliveryDones = (req, res) => {
  getConnectionPool(async (connection) => {
    try {
      let [rows] = await connection.query(getDeliveryDonesQuery);
      connection.release();
      return res.send(rows);
    } catch (err) {
      console.log("Query Error", err);
      connection.release();
      return res.send(err);
    }
  });
};

export const updateDeliveryToDoItemToStatusTwo = (req, res) => {
  // 채팅도 저장해야 되고 배송지연으로 처리도 해야함!!!!
  const { text, img_uri, is_first_msg } = req.body;
  const queryParams = [
    req.params.trackingnum,
    text,
    req.params.trackingnum,
    img_uri,
    is_first_msg,
    req.params.trackingnum,
  ];
  getConnectionPool(async (connection) => {
    try {
      await connection.query(
        updateDeliveryToDoItemToStatusTwoQuery,
        queryParams
      );
      connection.release();
      return res.send("DB update success");
    } catch (err) {
      console.log("Query Error", err);
      connection.release();
      return res.send(err);
    }
  });
};

export const updateDeliveryToDoItemToStatusThree = (req, res) => {
  // 채팅도 저장해야 되고 배송완료로 처리도 해야함!!!!
  const { text, img_uri, is_first_msg } = req.body;
  const queryParams = [
    req.params.trackingnum,
    text,
    req.params.trackingnum,
    img_uri,
    is_first_msg,
    req.params.trackingnum,
    req.params.trackingnum,
  ];
  getConnectionPool(async (connection) => {
    try {
      await connection.query(
        updateDeliveryToDoItemToStatusThreeQuery,
        queryParams
      );
      connection.release();
      return res.send("DB update success");
    } catch (err) {
      console.log("Query Error", err);
      connection.release();
      return res.send(err);
    }
  });
};
