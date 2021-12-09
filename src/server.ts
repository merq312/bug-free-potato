import path from "path"
import * as express from "express"
import { app, server } from "./app"
import userRouter from "./routes/userRouter"

app.use(express.static(path.join(__dirname, "../client/build")))
app.use(
  express.json({
    limit: "10kb",
  })
)
app.use(express.urlencoded({ extended: true, limit: "10kb" }))

// app.get("*", (req, res) => {
//   const filePath = path.join(__dirname + "../client/build", "index.html")
//   res.sendFile(filePath)
// })

app.use("/api/user", userRouter)

const port = process.env.PORT || 3333
server.listen(port, () => {
  console.log("listening on *:" + port)
})
server.on("error", console.error)
