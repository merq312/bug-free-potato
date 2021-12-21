import {
  ChangeEvent,
  FormEvent,
  KeyboardEvent,
  useEffect,
  useState,
} from "react"
import { useAppDispatch } from "../../features/hooks"
import { setUserName } from "../../features/user/userSlice"

type AppProps = {
  sendMessageHelper: (arg0: string) => void
  userName: string
}

function MsgClientInputComponent({ userName, sendMessageHelper }: AppProps) {
  const [userInput, setUserInput] = useState("")
  const [displayName, setDisplayName] = useState(userName)
  const dispatch = useAppDispatch()

  useEffect(() => {
    setDisplayName(userName)
  }, [userName])

  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setUserInput(e.target.value)
  }

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDisplayName(e.target.value)
    dispatch(setUserName(e.target.value))
  }

  const handleSubmit = (e: FormEvent | void) => {
    if (e) e.preventDefault()
    if (userInput !== "") {
      sendMessageHelper(userInput)
    }
    setUserInput("")
  }

  const checkReturnKey = (e: KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      handleSubmit()
    }
  }

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="h-full grid lg:grid-rows-1 grid-cols-12 items-center justify-around"
      >
        <input
          className="text-base h-full border-r border-gray-300 dark:border-gray-700 lg:text-2xl col-start-1 col-end-13 lg:col-start-1 lg:col-end-3 px-3 text-gray-800 dark:text-gray-200 bg-gray-200 dark:bg-gray-900 focus:outline-none resize-none"
          name="user-name"
          autoComplete="off"
          value={displayName}
          type="text"
          onChange={handleNameChange}
          data-cy="input-username"
        />
        <div className="col-start-1 lg:col-start-3 col-end-13 flex bg-gray-300 dark:bg-gray-800">
          <textarea
            className="no-scrollbar flex-grow min-w-0 my-3 px-3 py-1.5 bg-gray-300 dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:outline-none resize-none"
            name="user-input"
            rows={1}
            autoComplete="off"
            value={userInput}
            onChange={handleInputChange}
            onKeyDown={checkReturnKey}
            data-cy="input-message"
          />
          <button
            type="submit"
            className="px-2 sm:px-4 text-gray-800 dark:text-gray-200 font-bold"
            data-cy="send-message"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  )
}

export default MsgClientInputComponent
