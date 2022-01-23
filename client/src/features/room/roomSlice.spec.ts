import roomReducer, {
  MessageSendPacket,
  sendMessageToRoom,
  closeRoom,
  initialState,
} from "./roomSlice"

describe("room reducer", () => {
  const testMessage: MessageSendPacket = {
    content: "hello jest",
    userName: "Tester",
    sentAt: "1635872272682",
    roomId: "Global",
    socketId: "123",
  }

  const testMessageTwo: MessageSendPacket = {
    content: "hello again",
    userName: "Tester",
    sentAt: "1635872272682",
    roomId: "Global",
    socketId: "123",
  }

  const privateRoomMessage: MessageSendPacket = {
    content: "secret",
    userName: "Tester",
    sentAt: "1635872272682",
    roomId: "Private",
    socketId: "123",
  }

  test("should handle initial state", () => {
    expect(roomReducer(undefined, { type: "unknown" })).toEqual(initialState)
  })

  test("new messages are added to the room", () => {
    const actual = roomReducer(undefined, sendMessageToRoom(testMessage))
    expect(actual.Global[1].content).toEqual("hello jest")
  })

  test("sending a message preserves old message", () => {
    const firstMessage = roomReducer(undefined, sendMessageToRoom(testMessage))
    const secondMessage = roomReducer(
      firstMessage,
      sendMessageToRoom(testMessageTwo)
    )
    expect(secondMessage.Global[2].content).toEqual("hello again")
  })

  test("closing a room removes it from state", () => {
    const createRoom = roomReducer(
      undefined,
      sendMessageToRoom(privateRoomMessage)
    )
    expect(createRoom.Private).toBeDefined()
    const deleteRoom = roomReducer(undefined, closeRoom("Private"))
    expect(deleteRoom.Private).toBeUndefined()
  })
})
