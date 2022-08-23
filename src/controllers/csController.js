import { getConnectionPool } from "../database/db";
import {
  getCSDonesQuery,
  getCSToDosQuery,
  updateCSTodoItemToStatusThreeQuery,
} from "../database/query";

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
      await connection.query(updateCSTodoItemToStatusThreeQuery, queryParams);
      connection.release();
      return res.send("DB update success");
    } catch (err) {
      console.log("Query Error", err);
      connection.release();
      return res.send(err);
    }
  });
};
