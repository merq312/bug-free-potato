import { useAuth0 } from '@auth0/auth0-react'
import { Redirect } from 'react-router-dom'

const buttonStyles =
  'text-white border-2 border-transparent p-2 my-6 rounded bg-green-400 shadow-md hover:bg-green-600 transition duration-500 ease-in-out transform hover:-translate-y-1'

function Home() {
  const { logout, isAuthenticated, isLoading } = useAuth0()

  return (
    <div className="text-center flex flex-col items-center justify-center text-2xl col-start-3 col-end-11">
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
        <Redirect to={{ pathname: '/login' }} />
      )}
    </div>
  )
}

export default Home
