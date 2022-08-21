import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config();

const connection = mysql.createConnection({
  host: process.env.AWS_DB_HOST,
  user: process.env.AWS_DB_USER,
  password: process.env.AWS_DB_PASSWORD,
  port: process.env.AWS_DB_PORT,
  database: "test",
});

// connection.connect(function (err) {
//   if (err) {
//     throw err;
//   }
//   console.log("✅ Connected to DB 🎉");
// });

connection.query("SELECT * FROM fruit", function (err, rows, fields) {
  console.log(rows); // 결과를 출력합니다!
});

// connection.end();
