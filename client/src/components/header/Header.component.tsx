import {useAuth0} from "@auth0/auth0-react"
import HeaderButtonComponent from "../header-button/Header-button.component"

type AppProps = {
  setDarkMode: (arg0: boolean) => void,
  currentMode: boolean
}

function HeaderComponent({setDarkMode, currentMode}: AppProps) {
  const {logout, loginWithRedirect, isAuthenticated, isLoading} = useAuth0()

  return (
    <header
      className="bg-gray-200 dark:bg-gray-900 flex items-center justify-between w-screen h-16 border-b border-gray-400 dark:border-gray-600">
      <h1 className="text-gray-800 dark:text-gray-200 text-3xl font-bold m-2">
        Transmitter
      </h1>
      <div className="flex">
        <div className="flex items-center justify-center">
          <div className="mr-2">🌞</div>
          <label htmlFor="toggle" className="flex items-center cursor-pointer">
            <div className="relative">
              <input onClick={() => setDarkMode(!currentMode)} id="toggle" type="checkbox" className="sr-only"/>
              <div className="w-6 h-2 bg-gray-400 rounded-full shadow-inner"/>
              <div className="dot absolute w-4 h-4 bg-white rounded-full shadow -left-1 -top-1 transition"/>
            </div>
          </label>
          <div className="ml-2">🌙</div>
        </div>

        {isLoading ? (
          <p className="text-gray-800 dark:text-gray-200 mx-4">Loading...</p>
        ) : isAuthenticated ? (
          <HeaderButtonComponent
            text="Log Out"
            handleClick={() => logout({returnTo: window.location.origin})}
          />
        ) : (
          <HeaderButtonComponent
            text="Log In"
            handleClick={() => loginWithRedirect()}
          />
        )}
      </div>
    </header>
  )
}

export default HeaderComponent
