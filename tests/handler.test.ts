import { Context, ScheduledEvent } from "aws-lambda"
import { handler } from "../src/nudge"

const event = {} as ScheduledEvent
const context = {} as Context
const callback = jest.fn()

beforeEach(() => jest.resetAllMocks())

describe("nudge handler", () => {
  it("isn't implemented", () => {
    handler(event, context, callback)
    expect(callback).toBeCalledWith(new Error("Not implemented"))
  })
})
