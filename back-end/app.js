require("dotenv").config()

const express = require("express")
const cors = require("cors")
const path = require("path")

const port = process.env.PORT

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

//solve cors
app.use(cors({ credentials: true, origin: "http://localhost:3000" }))

//upload directory
app.use("/uploads", express.static(path.join(__dirname, "/uploads")))

//db connection
require("./config/db.js")

//routers
const router = require("./routers/router")

app.use(router)

app.listen(port, () => {
   console.log(`App rodando na porta ${port}`)
})