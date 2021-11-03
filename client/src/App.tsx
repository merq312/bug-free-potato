import { BrowserRouter, Route, Switch } from "react-router-dom"
import HomePage from "./pages/home/home.page"
import HeaderComponent from "./components/header/header.component"

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <HeaderComponent />
      <main className="flex-grow grid grid-cols-12 text-xl sm:text-2xl  bg-gray-700 ">
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
