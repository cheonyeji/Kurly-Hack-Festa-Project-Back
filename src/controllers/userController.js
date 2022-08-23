import { getConnectionPool, pool } from "../database/db";
import {
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

// export const setCSOrdernumItem = async (req, res) => {
//   const { img_uri, title, content, category } = req.body;
//   const queryParams = [
//     req.params.ordernum,
//     img_uri,
//     title,
//     content,
//     category,
//     0,
//   ];

//   try {
//     const connection = await pool.getConnection(async (conn) => conn);
//     try {
//       await connection.query(setCSOrdernumItemQuery, queryParams);
//       connection.release();
//       console.log("Success");
//       return res.send("DB insert success");
//     } catch (err) {
//       console.log("Query Error", err);
//       connection.release();
//       return res.send(err);
//     }
//   } catch (err) {
//     console.log("DB error");
//     return res.send(err);
//   }
// };
