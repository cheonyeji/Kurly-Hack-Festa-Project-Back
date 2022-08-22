import { getConnectionPool } from "../dababase/db";
import {
  getOrderItemsQuery,
  getOrdernumItemQuery,
  setCSOrdernumItemQuery,
} from "../dababase/query";

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
  const { img_uri, title, content, category } = req.body;
  const queryParams = [
    req.params.ordernum,
    img_uri,
    title,
    content,
    category,
    0,
  ];

  getConnectionPool(async (connection) => {
    try {
      await connection.query(setCSOrdernumItemQuery, queryParams);
      connection.release();
      return res.status(200);
    } catch (err) {
      console.log("Query Error", err);
      connection.release();
      return res.send(err);
    }
  });
};
