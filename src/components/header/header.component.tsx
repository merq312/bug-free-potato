import { useAuth0 } from "@auth0/auth0-react"

const buttonStyles =
  "m-2 text-white border-2 border-transparent p-2 my-6 rounded bg-green-400 shadow-md hover:bg-green-600 transition duration-500 ease-in-out"

function HeaderComponent() {
  const { logout, isAuthenticated } = useAuth0()

  return (
    <header className="bg-gray-100 flex items-center justify-between w-screen h-16">
      <h1 className="text-green-400 text-4xl font-bold m-2">Header</h1>
      {isAuthenticated ? (
        <button
          className={buttonStyles}
          onClick={() => logout({ returnTo: window.location.origin })}
        >
          Log Out
        </button>
      ) : (
        <div />
      )}
    </header>
  )
}

export default HeaderComponent
