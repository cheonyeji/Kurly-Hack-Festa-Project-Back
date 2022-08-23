import { getConnectionPool } from "../database/db";
import { getCSDonesQuery, getCSToDosQuery } from "../database/query";

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

export const updateCSTodoItem = (req, res) => {
  return res.send(`${req.params.trackingnum}을 재배송완료했다고 처리합니다`);
};
