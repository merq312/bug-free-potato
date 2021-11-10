import roomReducer, {MessageWithRoomId, sendMessageToRoom} from "./roomSlice"

describe("room reducer", () => {
  const testMessage: MessageWithRoomId = {
    content: "hello jest",
    userName: "Tester",
    sentAt: "1635872272682",
    roomId: "Global",
  }

  test("should handle initial state", () => {
    expect(roomReducer(undefined, {type: "unknown"})).toEqual({
      Global: [
        {
          content: "hello world",
          userName: "Guest",
          sentAt: "1635830205267",
        },
      ],
      Somebody: [
        {
          content: "hello",
          userName: "Somebody",
          sentAt: "1635830212312",
        },
      ],
    })
  })

  test("sending a message preserves old message", () => {
    const actual = roomReducer(undefined, sendMessageToRoom(testMessage))
    expect(actual.Global[0].content).toEqual("hello world")
  })

  test("new message are added to the room", () => {
    const actual = roomReducer(undefined, sendMessageToRoom(testMessage))
    expect(actual.Global[1].content).toEqual("hello jest")
  })
})
