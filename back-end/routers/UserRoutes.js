const express = require("express")
const router = express()

//controller
const { register } = require("../controllers/UserController")

//middlewares
const validate = require("../middlewares/handleValidation")

//routes
router.post("/register", register)

module.exports = router