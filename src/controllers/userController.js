import { getConnectionPool } from "../database/db";
import {
  getChattingHistoryByTempQuery,
  getOrderItemsQuery,
  getOrdernumItemQuery,
  setCSOrdernumItemQuery,
} from "../database/query";

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
      await connection.query(setCSOrdernumItemQuery, queryParams);
      connection.release();
      return res.send("DB insert success");
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
