import { ChangeEvent, FormEvent, useState } from "react"

type AppProps = {
  sendMessageHelper: (arg0: string) => void
  userName: string
}

function MsgClientInputComponent({ userName, sendMessageHelper }: AppProps) {
  const [userInput, setUserInput] = useState("")

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUserInput(e.target.value)
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
        className="h-full flex items-center justify-around"
      >
        <div className="px-3 text-gray-700 hidden sm:block">{userName}</div>
        <input
          className="ml-4 sm:ml-0 min-w-0 flex-grow my-3 px-3 py-1.5 rounded-xl bg-gray-200 focus:outline-none align-middle resize-none"
          name="user-input"
          value={userInput}
          type="text"
          onChange={handleChange}
        />
        <button type="submit" className="px-2 sm:px-4 text-gray-700 font-bold">
          Send
        </button>
      </form>
    </div>
  )
}

export default MsgClientInputComponent
