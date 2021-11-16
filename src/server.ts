import path from "path";
import express from "express";
import {app, server} from "./app";

app.use(express.static(path.join(__dirname, "../client/build")))

app.get("*", (req, res) => {
  const filePath = path.join(__dirname + "../client/build", "index.html")
  res.sendFile(filePath)
})

const port = process.env.PORT || 3000
server.listen(port, () => {
  console.log("listening on *:" + port)
})
server.on("error", console.error)
