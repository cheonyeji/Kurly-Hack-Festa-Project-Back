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
//       const queryParams = [
//         "1234",
//         "",
//         "테스트제목",
//         "테스트내용",
//         "테스트카테고리",
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
//   console.log("✅ Connected to DB 🎉");
// });

// connection.query("SELECT * FROM fruit", function (err, rows, fields) {
//   console.log(rows); // 결과를 출력합니다!
// });

// connection.end();
