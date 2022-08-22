import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

export const pool = mysql.createPool({
  host: process.env.AWS_DB_HOST,
  user: process.env.AWS_DB_USER,
  password: process.env.AWS_DB_PASSWORD,
  port: process.env.AWS_DB_PORT,
  database: "kurylyDB",
  connectionLimit: 30,
  enableKeepAlive: true,
});

export async function getConnectionPool(callback) {
  const connection = await pool.getConnection(async (err, conn) => {
    if (!err) {
      return conn;
    } else {
      console.log("db connection err", err);
      throw err;
    }
  });
  console.log("✅ Connected to DB 🎉");
  callback(connection);
}

// const getOrderItemQuery = async () => {
//   try {
//     const connection = await pool.getConnection(async (conn) => conn);
//     try {
//       let [rows] = await connection.query("SELECT * FROM `order`");
//       connection.release();
//       console.log(rows);
//       return rows;
//     } catch (err) {
//       console.log("Query Error", err);
//       connection.release();
//       return false;
//     }
//   } catch (err) {
//     console.log("DB error");
//     return false;
//   }
// };

// getOrderItemQuery();

// connection.connect(function (err) {
//   if (err) {
//     throw err;
//   }
//   console.log("✅ Connected to DB 🎉");
// });

// connection.query("SELECT * FROM fruit", function (err, rows, fields) {
//   console.log(rows); // 결과를 출력합니다!
// });

// connection.end();
