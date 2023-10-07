import express from "express";
import AWS from "./aws-config.js";
import dotenv from "dotenv";
const app = express();

const codepipeline = new AWS.CodePipeline();

dotenv.config();
//development
app.post("/development", async (req, res) => {
  const params = {
    name: process.env.dev_pipe,
  };

  try {
    const response = await codepipeline
      .startPipelineExecution(params)
      .promise();
    console.log(
      `Pipeline execution started successfully for ${params.name}:`,
      response
    );
    res.send(
      `Webhook received and  ${params.name} pipeline triggered successfully.`
    );
  } catch (error) {
    console.error(
      `Error starting pipeline execution for ${params.name}:`,
      error
    );

    res.status = 500;
    res.send("Error triggering pipelines");
  }
});

//production
app.post("/production", async (req, res) => {
  const params = {
    name: process.env.prod_pipe,
  };

  try {
    const response = await codepipeline
      .startPipelineExecution(params)
      .promise();
    console.log(
      `Pipeline execution started successfully for ${params.name}:`,
      response
    );
    res.send(
      `Webhook received and  ${params.name} pipeline triggered successfully.`
    );
  } catch (error) {
    console.error(
      `Error starting pipeline execution for ${params.name}:`,
      error
    );

    res.status = 500;
    res.send("Error triggering pipelines");
  }
});

app.listen(3000, () => console.log("server started on port 3000"));
