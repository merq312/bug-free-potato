import { ChangeEvent, FormEvent, useState } from "react"
import { useAppDispatch } from "../../app/hooks"
import { send } from "../../features/messages/messageSlice"

function MsgClientInputComponent() {
  const dispatch = useAppDispatch()
  const [userInput, setUserInput] = useState("")

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUserInput(e.target.value)
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    dispatch(send(userInput))
    setUserInput("")
  }

  return (
    <div className="bg-gray-300">
      <form
        onSubmit={handleSubmit}
        className="h-full flex items-center justify-around"
      >
        <div className="px-3 text-gray-700">Guest</div>
        <input
          className="h-12 flex-grow my-3 px-6 py-1.5 rounded-xl bg-gray-200 focus:outline-none align-middle resize-none"
          name="user-input"
          value={userInput}
          type="text"
          onChange={handleChange}
        />
        <button type="submit" className="px-4 text-gray-700 font-bold">
          Send
        </button>
      </form>
    </div>
  )
}

export default MsgClientInputComponent
