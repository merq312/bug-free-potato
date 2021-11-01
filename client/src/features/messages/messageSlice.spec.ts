import messageReducer, { Message, send } from "./messageSlice"

describe("message reducer", () => {
  const testMessage: Message = {
    content: "Hello jest",
    username: "Tester",
    sentAt: "10 mins ago",
  }

  test("should handle initial state", () => {
    expect(messageReducer(undefined, { type: "unknown" })).toEqual({
      messages: [
        { content: "hello world", username: "guest", sentAt: "5 mins ago" },
      ],
    })
  })

  test("should accept new messages", () => {
    const actual = messageReducer(undefined, send(testMessage))
    expect(actual.messages[1].content).toEqual("Hello jest")
  })
})
