import { ChangeEvent, FormEvent, useState } from "react"
import { useAppDispatch } from "../../app/hooks"
import { send } from "../../features/messages/messageSlice"

function MsgClientInputComponent() {
  const dispatch = useAppDispatch()
  const [userInput, setUserInput] = useState("")

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setUserInput(e.target.value)
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    dispatch(send(userInput))
    setUserInput("")
  }

  return (
    <div className="bg-gray-400 h-16">
      <form
        onSubmit={handleSubmit}
        className="h-full flex flex-row items-center justify-around"
      >
        <textarea
          className="h-12 flex-grow ml-4 px-4 pt-1.5 rounded-3xl bg-gray-300 focus:outline-none align-middle"
          name="user-input"
          value={userInput}
          onChange={handleChange}
        />
        <button type="submit" className="w-24 text-gray-700 font-bold">
          Send
        </button>
      </form>
    </div>
  )
}

export default MsgClientInputComponent
