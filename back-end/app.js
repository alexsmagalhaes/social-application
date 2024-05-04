require("dotenv").config()

const express = require("express")

const port = process.env.PORT

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

//routers
const router = require("./routers/router")

app.use(router)

app.listen(port, () => {
   console.log(`App rodando na porta ${port}`)
})