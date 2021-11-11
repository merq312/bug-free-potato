import { BrowserRouter, Route, Switch } from "react-router-dom"
import HomePage from "./pages/home/Home.page"
import HeaderComponent from "./components/header/Header.component"

function App() {
  return (
    <div className="flex flex-col h-screen">
      <HeaderComponent />
      <main className="grid grid-cols-12 overflow-hidden h-full text-xl sm:text-2xl  bg-gray-700 ">
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={HomePage} />
          </Switch>
        </BrowserRouter>
      </main>
    </div>
  )
}

export default App
