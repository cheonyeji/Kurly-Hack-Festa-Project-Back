import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

export const pool = mysql.createPool({
  host: process.env.AWS_DB_HOST,
  user: process.env.AWS_DB_USER,
  password: process.env.AWS_DB_PASSWORD,
  port: process.env.AWS_DB_PORT,
  database: "kurylyDB",
  connectionLimit: 40,
  enableKeepAlive: true,
  multipleStatements: true,
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
  console.log("โ Connected to DB ๐");
  callback(connection);
}

// const getOrderItemQuery = async () => {
//   try {
//     const connection = await pool.getConnection(async (conn) => conn);
//     try {
//       const queryParams = [
//         "1234",
//         "",
//         "ํ์คํธ์ ๋ชฉ",
//         "ํ์คํธ๋ด์ฉ",
//         "ํ์คํธ์นดํ๊ณ ๋ฆฌ",
//         0,
//       ];
//       await connection.query(
//         "INSERT INTO `cs` (`order_num`,`img_uri`,`request_title`,`request_content`,`request_category`,`completed`) VALUES(?,?,?,?,?,?)",
//         queryParams
//       );
//       connection.release();
//       console.log("Success");
//       return true;
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

//getOrderItemQuery();

// connection.connect(function (err) {
//   if (err) {
//     throw err;
//   }
//   console.log("โ Connected to DB ๐");
// });

// connection.query("SELECT * FROM fruit", function (err, rows, fields) {
//   console.log(rows); // ๊ฒฐ๊ณผ๋ฅผ ์ถ๋ ฅํฉ๋๋ค!
// });

// connection.end();
