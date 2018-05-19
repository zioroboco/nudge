import { ScheduledHandler } from "aws-lambda"

const handler: ScheduledHandler = (event, context, callback) => {
  callback(new Error("Not implemented"))
}

export { handler }
