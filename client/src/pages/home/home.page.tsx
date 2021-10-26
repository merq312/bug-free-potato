import { useAuth0 } from "@auth0/auth0-react"
import { Redirect } from "react-router-dom"
import MsgClientComponent from "../../components/msg-client/msg-client.component"

function HomePage() {
  const { isAuthenticated, isLoading } = useAuth0()

  return (
    <>
      {isLoading ? (
        <div className="flex flex-col justify-center col-start-6 col-end-8">
          <p className="text-white font-bold w-full text-4xl text-center">
            Loading...
          </p>
        </div>
      ) : isAuthenticated ? (
        <MsgClientComponent />
      ) : (
        <Redirect to={{ pathname: "/login" }} />
      )}
    </>
  )
}

export default HomePage
