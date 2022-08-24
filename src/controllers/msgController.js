import { getConnectionPool } from "../database/db";
import {
  getDeliveryDonesQuery,
  getDeliveryToDosQuery,
  updateDeliveryToDoItemToStatusThreeAndRetrunTokenQuery,
  updateDeliveryToDoItemToStatusTwoAndRetrunTokenQuery,
} from "../database/query";
import { convertTemp } from "../pushNoti/msgFn";
const admin = require("firebase-admin");

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
  const { text, is_first_msg, order_num } = req.body;
  const queryParams = [
    req.params.trackingnum,
    text,
    req.params.trackingnum,
    req.file === undefined ? "" : req.file.location,
    is_first_msg,
    req.params.trackingnum,
    order_num,
    req.params.trackingnum,
  ];
  getConnectionPool(async (connection) => {
    try {
      let [rows] = await connection.query(
        updateDeliveryToDoItemToStatusTwoAndRetrunTokenQuery,
        queryParams
      );
      connection.release();
      const user_token = rows[4][0].device_token;

      const { order_product, temperature } = rows[5][0];

      let message = {
        notification: {
          title: "상품의 배송이 지연되고 있습니다",
          body: `${order_product}의 ${convertTemp(
            temperature
          )} 상품을 최대한 빠르게 배송 완료하도록 노력하겠습니다.`,
        },
        token: user_token,
      };

      admin
        .messaging()
        .send(message)
        .then(function (response) {
          console.log("Successfully sent push noti");
          // return res.status(200).json({ success: true });
        })
        .catch(function (err) {
          console.log("Error Sending message: ", err);
          // return res.status(400).json({ success: false });
        });
      return res.send("DB update success and pushNoti success");
    } catch (err) {
      console.log("Query Error", err);
      connection.release();
      return res.send(err);
    }
  });
};

export const updateDeliveryToDoItemToStatusThree = (req, res) => {
  // 채팅도 저장해야 되고 배송완료로 처리도 해야함!!!!
  const { text, is_first_msg, order_num } = req.body;
  const queryParams = [
    req.params.trackingnum,
    text,
    req.params.trackingnum,
    req.file === undefined ? "" : req.file.location,
    is_first_msg,
    req.params.trackingnum,
    req.params.trackingnum,
    order_num,
    order_num,
    req.params.trackingnum,
  ];
  getConnectionPool(async (connection) => {
    try {
      let [rows] = await connection.query(
        updateDeliveryToDoItemToStatusThreeAndRetrunTokenQuery,
        queryParams
      );
      connection.release();

      const { order_product, temperature } = rows[5][0];

      const user_token = rows[4][0].device_token;

      let message = {
        notification: {
          title: "상품의 배송이 완료되었습니다",
          body: `${order_product}의 ${convertTemp(
            temperature
          )} 상품을 배송 완료하였습니다.`,
        },
        token: user_token,
      };

      admin
        .messaging()
        .send(message)
        .then(function (response) {
          console.log("Successfully sent push noti");
          // return res.status(200).json({ success: true });
        })
        .catch(function (err) {
          console.log("Error Sending message: ", err);
          // return res.status(400).json({ success: false });
        });
      return res.send("DB update success and pushNoti success");
    } catch (err) {
      console.log("Query Error", err);
      connection.release();
      return res.send(err);
    }
  });
};
