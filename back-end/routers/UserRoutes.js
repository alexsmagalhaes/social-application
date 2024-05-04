const express = require("express")
const router = express()

//controller
const { register } = require("../controllers/UserController")

//middlewares
const validate = require("../middlewares/handleValidation")
const { userCreateValidation } = require("../middlewares/userValidation")

//routes
router.post("/register", userCreateValidation(), register)

module.exports = router