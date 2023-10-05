import AWS from "./aws-config.js";

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

export async function triggerCodePipeline() {
  const codepipeline = new AWS.CodePipeline();
  try {
    await triggerPipeline("skillc-frontend");
    // console.log("test: ", process.env.AWS_DEV_PIPE_NAME);

    await triggerPipeline("skillac_frontend-production");

    ctx.send("Webhook received and both pipelines triggered successfully.");
  } catch (error) {
    console.error("Error triggering pipelines:", error);

    ctx.status = 500;
    ctx.send("Error triggering pipelines");
  }
}
