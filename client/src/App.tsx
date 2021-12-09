import { BrowserRouter, Route, Switch } from "react-router-dom"
import MsgClientPage from "./pages/msg-client/Msg-client.page"
import HeaderComponent from "./components/header/Header.component"
import { useEffect, useState } from "react"
import { useAuth0 } from "@auth0/auth0-react"
import axios from "axios"

function App() {
  const [darkMode, setDarkMode] = useState(false)
  const [message, setMessage] = useState("")
  const [token, setToken] = useState("")

  const { isAuthenticated, getAccessTokenSilently } = useAuth0()

  useEffect(() => {
    if (message) {
      console.log(message)
    }
  }, [message])

  useEffect(() => {
    if (!isAuthenticated) {
      return
    }

    getAccessTokenSilently().then(setToken)
  }, [isAuthenticated, getAccessTokenSilently])

  useEffect(() => {
    if (!token) {
      return
    }

    axios
      .get("http://localhost:3333/api/user/private", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((r) => setMessage(r.data.message))
      .catch((err) => console.log(err))
  }, [token])

  return (
    <div className={`${darkMode ? "dark" : ""} flex flex-col h-screen`}>
      <HeaderComponent setDarkMode={setDarkMode} currentMode={darkMode} />
      <main className="grid grid-cols-12 overflow-hidden h-full text-xl sm:text-2xl bg-gray-200 dark:bg-gray-900">
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
