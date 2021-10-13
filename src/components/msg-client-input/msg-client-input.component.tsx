function MsgClientInputComponent() {
  return (
    <div className="bg-gray-400 h-16">
      <form className="h-full flex flex-row items-center justify-around">
        <input className="h-12 flex-grow ml-4 px-4 rounded-3xl bg-gray-300 focus:outline-none" />
        <button className="w-24 text-gray-700 font-bold">Send</button>
      </form>
    </div>
  )
}

export default MsgClientInputComponent
