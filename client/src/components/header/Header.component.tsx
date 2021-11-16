import {useAuth0} from "@auth0/auth0-react"
import HeaderButtonComponent from "../header-button/Header-button.component"

function HeaderComponent() {
  const {logout, loginWithRedirect, isAuthenticated, isLoading} = useAuth0()

  return (
    <header className="bg-gray-200 flex items-center justify-between w-screen h-16 border-b border-gray-400">
      <h1 className="text-gray-800 text-3xl font-bold m-2">
        Transmitter
      </h1>
      {isLoading ? (
        <p className="text-gray-200 px-4">Loading...</p>
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
    </header>
  )
}

export default HeaderComponent
