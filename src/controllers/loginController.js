import { getConnectionPool } from "../database/db";
import { userLoginQuery, kurlyveryLoginQuery } from "../database/query";

export const userLogin = (req, res) => {
  const { device_token } = req.body;
  const queryParams = [device_token, "testuser01"];
  getConnectionPool(async (connection) => {
    try {
      await connection.query(userLoginQuery, queryParams);
      connection.release();
      return res.send("DB update success");
    } catch (err) {
      console.log("Query Error", err);
      connection.release();
      return res.send(err);
    }
  });
};
export const kurlyveryLogin = (req, res) => {
  const { device_token } = req.body;
  const queryParams = [device_token, "testvery01"];
  getConnectionPool(async (connection) => {
    try {
      await connection.query(kurlyveryLoginQuery, queryParams);
      connection.release();
      return res.send("DB update success");
    } catch (err) {
      console.log("Query Error", err);
      connection.release();
      return res.send(err);
    }
  });
};
