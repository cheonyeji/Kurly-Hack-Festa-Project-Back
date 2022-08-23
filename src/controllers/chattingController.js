import { getConnectionPool } from "../database/db";
import { getChattingHistoryQuery } from "../database/query";

export const getChattingHistory = (req, res) => {
  const queryParam = [req.params.trackingnum, req.params.trackingnum];

  getConnectionPool(async (connection) => {
    try {
      let [rows] = await connection.query(getChattingHistoryQuery, queryParam);
      connection.release();
      return res.send(rows);
    } catch (err) {
      console.log("Query Error", err);
      connection.release();
      return res.send(err);
    }
  });
};
