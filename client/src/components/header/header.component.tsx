import { useAuth0 } from "@auth0/auth0-react"

const buttonStyles =
  "m-2 text-black border-2 border-transparent p-2 my-6 rounded-xl bg-blue-200 shadow-md hover:bg-blue-300 transition duration-500 ease-in-out"

function HeaderComponent() {
  const { logout, loginWithRedirect, isAuthenticated, isLoading } = useAuth0()

  return (
    <header className="bg-gray-700 flex items-center justify-between w-screen h-16 border-b-2 border-gray-200">
      <h1 className="text-gray-200 text-xl sm:text-2xl font-bold m-2">
        Some Message App
      </h1>
      {isLoading ? (
        <p className="text-gray-200 px-4">Loading...</p>
      ) : isAuthenticated ? (
        <button
          className={buttonStyles}
          onClick={() => logout({ returnTo: window.location.origin })}
        >
          Log Out
        </button>
      ) : (
        <button className={buttonStyles} onClick={() => loginWithRedirect()}>
          Log In
        </button>
      )}
    </header>
  )
}

export default HeaderComponent
