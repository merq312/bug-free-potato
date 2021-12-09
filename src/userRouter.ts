import * as express from "express"
import { auth } from "express-oauth2-jwt-bearer"
import { ErrorRequestHandler } from "express"

const router = express.Router()

const checkJwt = auth({
  audience: "https://pacific-reef-85991.herokuapp.com/api",
  issuerBaseURL: `https://dev-iukg50h5.us.auth0.com/`,
})

router.get("/private", checkJwt, (req, res) => {
  res.status(200).json({
    status: "success",
    message: "You are authenticated",
  })
})

const errorHandler: ErrorRequestHandler = (err, req, res) => {
  if (err.name === "UnauthorizedError") {
    return res.status(401).json({ message: "Invalid token" })
  }
  return res.status(500).json({ message: "Server error" })
}

router.use(errorHandler)

export default router
