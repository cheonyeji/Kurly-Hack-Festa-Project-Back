import { getConnectionPool } from "../database/db";
import {
  getCSDonesQuery,
  getCSToDosQuery,
  updateCSTodoItemToStatusThreeAndReturnTokenQuery,
} from "../database/query";
const admin = require("firebase-admin");

export const getCSToDos = (req, res) => {
  getConnectionPool(async (connection) => {
    try {
      let [rows] = await connection.query(getCSToDosQuery);
      connection.release();
      return res.send(rows);
    } catch (err) {
      console.log("Query Error", err);
      connection.release();
      return res.send(err);
    }
  });
};
export const getCSDones = (req, res) => {
  getConnectionPool(async (connection) => {
    try {
      let [rows] = await connection.query(getCSDonesQuery);
      connection.release();
      return res.send(rows);
    } catch (err) {
      console.log("Query Error", err);
      connection.release();
      return res.send(err);
    }
  });
};

export const updateCSTodoItemToStatusThree = (req, res) => {
  const { text, is_first_msg, cs_id } = req.body;
  const queryParams = [
    text,
    req.params.trackingnum,
    req.file === undefined ? "" : req.file.location,
    is_first_msg,
    req.params.trackingnum,
    req.params.trackingnum,
    cs_id,
  ];
  getConnectionPool(async (connection) => {
    try {
      let [rows] = await connection.query(
        updateCSTodoItemToStatusThreeAndReturnTokenQuery,
        queryParams
      );
      connection.release();

      console.log(rows);
      console.log(rows[3][0]);

      const user_token = rows[3][0].device_token;

      let message = {
        notification: {
          title: "상품의 재배송이 완료되었습니다",
          body: `운송장 ${req.params.trackingnum} 상품을 다시 배송하였습니다.`,
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
