import {BrowserRouter, Route, Switch} from "react-router-dom"
import MsgClientPage from "./pages/msg-client/Msg-client.page";
import HeaderComponent from "./components/header/Header.component"
import {useState} from "react";

function App() {
  const [darkMode, setDarkMode] = useState(false)

  return (
    <div className={`${darkMode ? "dark" : ""} flex flex-col h-screen`}>
      <HeaderComponent setDarkMode={setDarkMode} currentMode={darkMode}/>
      <main className="grid grid-cols-12 overflow-hidden h-full text-xl sm:text-2xl bg-gray-200 dark:bg-gray-900">
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={MsgClientPage}/>
          </Switch>
        </BrowserRouter>
      </main>
    </div>
  )
}

export default App
