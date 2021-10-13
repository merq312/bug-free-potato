import { useAuth0 } from '@auth0/auth0-react'

const buttonStyles =
  'text-white border-2 border-transparent p-2 my-6 rounded bg-green-400 shadow-md hover:bg-green-600 transition duration-500 ease-in-out'

function LoginPage() {
  const { loginWithRedirect } = useAuth0()

  return (
    <div className="text-center flex flex-col items-center justify-center text-2xl col-start-3 col-end-11">
      <button className={buttonStyles} onClick={() => loginWithRedirect()}>
        Log In
      </button>
    </div>
  )
}

export default LoginPage
