import { Switch, Route, Redirect } from 'react-router-dom'
import Home from './pages/home/home'

function App() {
  return (
    <div className="text-center">
      <header className="min-h-screen flex flex-col items-center justify-center text-2xl">
        <Switch>
          <Route exact path="/" component={Home} />
        </Switch>
      </header>
    </div>
  )
}

export default App
