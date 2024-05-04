const express = require("express")

const port = 500.

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.listen(port, () => {
   console.log(`App rodando na porta ${port}`)
})