import * as express from "express"
import { auth } from "express-oauth2-jwt-bearer"
import { ErrorRequestHandler } from "express"

const router = express.Router()

const checkJwt = auth({
  audience: "https://pacific-reef-85991.herokuapp.com/api",
  issuerBaseURL: `https://dev-iukg50h5.us.auth0.com/`,
})

router.post("/private", checkJwt, (req, res) => {
  const { uid } = req.body
  console.log(uid)

  res.status(200).json({
    status: "success",
  })
})

export default router
