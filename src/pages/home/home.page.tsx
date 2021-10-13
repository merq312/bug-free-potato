import { useAuth0 } from "@auth0/auth0-react"
import { Redirect } from "react-router-dom"
import MsgClientComponent from "../../components/msg-client/msg-client.component"

function HomePage() {
  const { isAuthenticated, isLoading } = useAuth0()

  return (
    <>
      {isLoading ? (
        <p>Loading...</p>
      ) : isAuthenticated ? (
        <MsgClientComponent />
      ) : (
        <Redirect to={{ pathname: "/login" }} />
      )}
    </>
  )
}

export default HomePage
