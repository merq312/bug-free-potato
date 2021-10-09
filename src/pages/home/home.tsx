import { useAuth0 } from '@auth0/auth0-react'

const buttonStyles =
  'text-white border-2 border-transparent p-2 my-6 rounded bg-green-400 shadow-md hover:bg-green-600 transition duration-500 ease-in-out transform hover:-translate-y-1'

function Home() {
  const { loginWithRedirect, logout, user, isAuthenticated, isLoading } =
    useAuth0()

  if (isLoading) {
    return <p>Loading...</p>
  }

  return (
    <>
      <p>Hello React, Redux, Tailwind, Auth0, and Typescript!</p>

      {isLoading ? (
        <p>Loading...</p>
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
    </>
  )
}

export default Home
