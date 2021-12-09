import { BrowserRouter, Route, Switch } from "react-router-dom"
import MsgClientPage from "./pages/msg-client/Msg-client.page"
import HeaderComponent from "./components/header/Header.component"
import { useEffect, useState } from "react"
import { useAuth0 } from "@auth0/auth0-react"
import axios from "axios"

function App() {
  const [darkMode, setDarkMode] = useState(false)
  const [token, setToken] = useState("")

  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0()

  useEffect(() => {
    if (isAuthenticated) {
      getAccessTokenSilently().then(setToken)
    }
  }, [isAuthenticated, getAccessTokenSilently])

  useEffect(() => {
    if (token && user && user.sub) {
      axios
        .post(
          "http://localhost:3333/api/user/private",
          {
            uid: user.sub,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .catch((err) => console.log(err))
    }
  }, [token, user])

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
