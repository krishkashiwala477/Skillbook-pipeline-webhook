import express from "express";
import AWS from "./aws-config.js";
const app = express();

const codepipeline = new AWS.CodePipeline();

//development
app.post("/development", async (req, res) => {
  const params = {
    name: "skillc-frontend",
  };

  try {
    const response = await codepipeline
      .startPipelineExecution(params)
      .promise();
    console.log(
      `Pipeline execution started successfully for ${params.name}:`,
      response
    );
    res.send("Webhook received and both pipelines triggered successfully.");
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
    name: "skillac_frontend-production",
  };

  try {
    const response = await codepipeline
      .startPipelineExecution(params)
      .promise();
    console.log(
      `Pipeline execution started successfully for ${params.name}:`,
      response
    );
    res.send("Webhook received and both pipelines triggered successfully.");
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
