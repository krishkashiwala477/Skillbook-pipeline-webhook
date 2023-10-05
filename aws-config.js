// aws-config.js
import AWS from "aws-sdk";

AWS.config.update({
  accessKeyId: "AKIA4B2RSLGMP7QG3GXO",
  secretAccessKey: "BJs7idgF7BRl9s4xFEIGDd4pxlHqv8VFPagOG/K3",
  region: "us-east-1", // Change to your desired AWS region
});

export default AWS;
