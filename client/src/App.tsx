import { BrowserRouter, Route, Switch } from "react-router-dom"
import MsgClientPage from "./pages/msg-client/Msg-client.page";
import HeaderComponent from "./components/header/Header.component"

function App() {
  return (
    <div className="flex flex-col h-screen">
      <HeaderComponent />
      <main className="grid grid-cols-12 overflow-hidden h-full text-xl sm:text-2xl  bg-gray-700 ">
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={MsgClientPage} />
          </Switch>
        </BrowserRouter>
      </main>
    </div>
  )
}

export default App
