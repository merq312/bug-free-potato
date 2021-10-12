import { Route, Switch } from 'react-router-dom'
import Home from './pages/home/home'
import Login from './pages/login/login'
import Header from './components/header/header.component'
import Footer from './components/footer/footer.component'

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow grid grid-cols-12">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
        </Switch>
      </main>
      <Footer />
    </div>
  )
}

export default App
