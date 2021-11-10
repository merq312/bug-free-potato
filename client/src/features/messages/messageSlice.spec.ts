import messageReducer, {Message, sendMessage} from "./messageSlice"

describe("message reducer", () => {
  const testMessage: Message = {
    content: "hello jest",
    userName: "Tester",
    sentAt: "1635872272682",
  }

  test("should handle initial state", () => {
    expect(messageReducer(undefined, {type: "unknown"})).toEqual([
        {content: "hello world", userName: "Guest", sentAt: "1635830205267"},
      ]
    )
  })

  test("should accept new messages", () => {
    const actual = messageReducer(undefined, sendMessage(testMessage))
    expect(actual[1].content).toEqual("hello jest")
  })
})
