import { Route, Switch } from "react-router-dom"
import HomePage from "./pages/home/home.page"
import LoginPage from "./pages/login/login.page"
import HeaderComponent from "./components/header/header.component"
import FooterComponent from "./components/footer/footer.component"

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <HeaderComponent />
      <main className="flex-grow grid grid-cols-12 bg-gray-700">
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/login" component={LoginPage} />
        </Switch>
      </main>
      <FooterComponent />
    </div>
  )
}

export default App
