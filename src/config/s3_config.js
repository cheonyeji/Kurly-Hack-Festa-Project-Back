const aws = require("aws-sdk");
import dotenv from "dotenv";

dotenv.config();

const s3 = new aws.S3({
  accessKeyId: process.env.AWS_S3_ACCESS_KEY,
  secretAccessKey: process.env.AWS_S3_PRIVATE_KEY,
  region: process.env.AWS_S3_REGION,
});

export default s3;
