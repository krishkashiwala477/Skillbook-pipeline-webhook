// aws-config.js
import AWS from "aws-sdk";

import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

AWS.config.update({
  accessKeyId: process.env.accessKeyId,
  secretAccessKey: process.env.secretAccessKey,
  region: process.env.region,
});

export default AWS;
