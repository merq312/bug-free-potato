import userReducer, {
  otherUser,
  setSocketId,
  updateUserList,
} from './userSlice'

describe('user reducer', () => {
  test('should handle initial state', () => {
    expect(userReducer(undefined, { type: 'unknown' })).toEqual({
      self: {
        socketId: '',
        userId: '123',
        userName: 'Guest',
      },
      userList: [],
    })
  })

  test('should accept setting socket id', () => {
    const testSocketId = 'abc123'
    const actual = userReducer(undefined, setSocketId(testSocketId))
    expect(actual.self.socketId).toEqual(testSocketId)
  })

  test('should accept setting user name', () => {
    const testUserName = 'abc123'
    const actual = userReducer(undefined, setSocketId(testUserName))
    expect(actual.self.socketId).toEqual(testUserName)
  })

  test('should accept setting user id', () => {
    const testUserId = 'abc123'
    const actual = userReducer(undefined, setSocketId(testUserId))
    expect(actual.self.socketId).toEqual(testUserId)
  })

  test('should accept new user list', () => {
    const newUserList: Array<otherUser> = [
      {
        uuid: 'abc123',
        userName: 'Alice',
      },
      {
        uuid: 'def456',
        userName: 'Bob',
      },
    ]

    const actual = userReducer(undefined, updateUserList(newUserList))
    expect(actual.userList).toEqual(newUserList)
  })
})
