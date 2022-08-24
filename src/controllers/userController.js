import { getConnectionPool } from "../database/db";
import {
  getChattingHistoryByTempQuery,
  getOrderItemsQuery,
  getOrdernumItemQuery,
  setCSOrdernumItemAndReturnTokenQuery,
} from "../database/query";
const admin = require("firebase-admin");

export const getOrderItems = (req, res) => {
  getConnectionPool(async (connection) => {
    try {
      let [rows] = await connection.query(getOrderItemsQuery);
      connection.release();
      return res.send(rows);
    } catch (err) {
      console.log("Query Error", err);
      connection.release();
      return res.send(err);
    }
  });
};

export const getOrdernumItem = (req, res) => {
  getConnectionPool(async (connection) => {
    try {
      let [rows] = await connection.query(
        getOrdernumItemQuery,
        req.params.ordernum
      );
      connection.release();
      return res.send(rows);
    } catch (err) {
      console.log("Query Error", err);
      connection.release();
      return res.send(err);
    }
  });
};

export const setCSOrdernumItem = (req, res) => {
  const { title, content, category, temperature } = req.body;

  const queryParams = [
    req.params.ordernum,
    req.file === undefined ? "" : req.file.location,
    title,
    content,
    category,
    0,
    temperature,
    req.params.ordernum,
  ];

  getConnectionPool(async (connection) => {
    try {
      let [rows] = await connection.query(
        setCSOrdernumItemAndReturnTokenQuery,
        queryParams
      );
      connection.release();
      const kurlyvery_token = rows[1][0].device_token;

      let message = {
        notification: {
          title: "새로운 CS가 접수되었습니다",
          body: category,
        },
        token: kurlyvery_token,
      };

      admin
        .messaging()
        .send(message)
        .then(function (response) {
          console.log("Successfully sent push noti", response);
          // return res.status(200).json({ success: true });
        })
        .catch(function (err) {
          console.log("Error Sending message: ", err);
          // return res.status(400).json({ success: false });
        });

      return res.send("DB insert success and pushNoti success");
    } catch (err) {
      console.log("Query Error", err);
      connection.release();
      return res.send(err);
    }
  });
};

export const getChattingHistoryTempIsRoom = (req, res) => {
  const queryParams = [req.params.ordernum, "room"];

  getConnectionPool(async (connection) => {
    try {
      let [rows] = await connection.query(
        getChattingHistoryByTempQuery,
        queryParams
      );
      connection.release();
      return res.send(rows);
    } catch (err) {
      console.log("Query Error", err);
      connection.release();
      return res.send(err);
    }
  });
};

export const getChattingHistoryTempIsRefrig = (req, res) => {
  const queryParams = [req.params.ordernum, "refrigerating"];
  getConnectionPool(async (connection) => {
    try {
      let [rows] = await connection.query(
        getChattingHistoryByTempQuery,
        queryParams
      );
      connection.release();
      return res.send(rows);
    } catch (err) {
      console.log("Query Error", err);
      connection.release();
      return res.send(err);
    }
  });
};

export const getChattingHistoryTempIsFreez = (req, res) => {
  const queryParams = [req.params.ordernum, "freezing"];
  getConnectionPool(async (connection) => {
    try {
      let [rows] = await connection.query(
        getChattingHistoryByTempQuery,
        queryParams
      );
      connection.release();
      return res.send(rows);
    } catch (err) {
      console.log("Query Error", err);
      connection.release();
      return res.send(err);
    }
  });
};
