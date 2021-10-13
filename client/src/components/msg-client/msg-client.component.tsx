import MsgClientInputComponent from "../msg-client-input/msg-client-input.component"
import MsgClientItemComponent from "../msg-client-item/msg-client-item.component"

function MsgClientComponent() {
  return (
    <div className="flex flex-col text-2xl col-start-3 col-end-11">
      <div className="h-full bg-gray-300 flex flex-col justify-end">
        <MsgClientItemComponent />
        <MsgClientItemComponent />
        <MsgClientItemComponent />
        <MsgClientItemComponent />
      </div>
      <MsgClientInputComponent />
    </div>
  )
}

export default MsgClientComponent
