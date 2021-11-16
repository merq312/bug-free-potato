import {useAuth0} from "@auth0/auth0-react"
import HeaderButtonComponent from "../header-button/Header-button.component"

function HeaderComponent() {
  const {logout, loginWithRedirect, isAuthenticated, isLoading} = useAuth0()

  return (
    <header className="bg-gray-700 flex items-center justify-between w-screen h-16 border-b-2 border-gray-200">
      <h1 className="text-gray-200 text-xl sm:text-2xl font-bold m-2">
        Some Message App
      </h1>
      {isLoading ? (
        <p className="text-gray-200 px-4">Loading...</p>
      ) : isAuthenticated ? (
        <HeaderButtonComponent
          text="Logout"
          handleClick={() => logout({returnTo: window.location.origin})}
        />
      ) : (
        <HeaderButtonComponent
          text="Login"
          handleClick={() => loginWithRedirect()}
        />
      )}
    </header>
  )
}

export default HeaderComponent
