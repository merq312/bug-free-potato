import roomReducer, {MessageSendPacket, sendMessageToRoom} from "./roomSlice"

describe("room reducer", () => {
  const testMessage: MessageSendPacket = {
    content: "hello jest",
    userName: "Tester",
    sentAt: "1635872272682",
    roomId: "Global",
    socketId: "123"
  }

  const testMessageTwo: MessageSendPacket = {
    content: "hello again",
    userName: "Tester",
    sentAt: "1635872272682",
    roomId: "Global",
    socketId: "123"
  }

  test("should handle initial state", () => {
    expect(roomReducer(undefined, {type: "unknown"})).toEqual({
      Global: [],
    })
  })

  test("new messages are added to the room", () => {
    const actual = roomReducer(undefined, sendMessageToRoom(testMessage))
    expect(actual.Global[0].content).toEqual("hello jest")
  })

  test("sending a message preserves old message", () => {
    const firstMessage = roomReducer(undefined, sendMessageToRoom(testMessage))
    const secondMessage = roomReducer(firstMessage, sendMessageToRoom(testMessageTwo))
    expect(secondMessage.Global[1].content).toEqual("hello again")
  })

})
