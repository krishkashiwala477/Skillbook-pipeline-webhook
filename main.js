import express from "express";
import AWS from "./aws-config.js";
const app = express();

const codepipeline = new AWS.CodePipeline();
app.use("/pipelines", async (req, res) => {
  //top

  async function triggerPipeline(pipelineName) {
    const params = {
      name: pipelineName,
    };

    try {
      const response = await codepipeline
        .startPipelineExecution(params)
        .promise();
      console.log(
        `Pipeline execution started successfully for ${pipelineName}:`,
        response
      );
    } catch (error) {
      console.error(
        `Error starting pipeline execution for ${pipelineName}:`,
        error
      );
      throw error;
    }
  }
  //bot

  try {
    await triggerPipeline("skillc-frontend");
    // console.log("test: ", process.env.AWS_DEV_PIPE_NAME);

    await triggerPipeline("skillac_frontend-production");

    res.send("Webhook received and both pipelines triggered successfully.");
  } catch (error) {
    console.error("Error triggering pipelines:", error);

    res.status = 500;
    res.send("Error triggering pipelines");
  }

  //   const response = await triggerCodePipeline();
  //   console.log("response: ", response);
  //   return res.json(response);
});

app.listen(3000, () => console.log("server started on port 3000"));
