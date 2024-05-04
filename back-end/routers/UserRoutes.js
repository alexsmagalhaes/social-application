const express = require("express")
const router = express()

//controller
const {register} = require("../controllers/UserController")

//routes
router.post("/register", register)

module.exports = router