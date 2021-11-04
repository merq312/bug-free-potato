import { ChangeEvent, FormEvent, useEffect, useState } from "react"
import { useAppDispatch } from "../../app/hooks"
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

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUserInput(e.target.value)
  }

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDisplayName(e.target.value)
    dispatch(setUserName(e.target.value))
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (userInput !== "") {
      sendMessageHelper(userInput)
    }
    setUserInput("")
  }

  return (
    <div className="bg-gray-300">
      <form
        onSubmit={handleSubmit}
        className="h-full grid md:grid-rows-1 grid-cols-12 items-center justify-around"
      >
        <input
          className="text-sm md:text-2xl col-start-1 col-end-13 md:col-start-1 md:col-end-3 px-3 text-gray-700 bg-gray-300 focus:outline-none resize-none"
          name="user-name"
          autoComplete="off"
          value={displayName}
          type="text"
          onChange={handleNameChange}
        />
        <div className="col-start-1 md:col-start-3 col-end-13 ml-2 flex">
          <input
            className="flex-grow min-w-0 my-3 px-3 py-1.5 rounded-xl bg-gray-200 focus:outline-none resize-none"
            name="user-input"
            autoComplete="off"
            value={userInput}
            type="text"
            onChange={handleInputChange}
          />
          <button
            type="submit"
            className="px-2 sm:px-4 text-gray-700 font-bold"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  )
}

export default MsgClientInputComponent
