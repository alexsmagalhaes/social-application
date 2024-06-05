const express = require("express")
const router = express.Router()

//controller
const { register, login, getCurrentUser, update, getUserById } = require("../controllers/UserController")

//middlewares
const validate = require("../middlewares/handleValidation")
const { userCreateValidation, loginValidation, userUpdateValidation } = require("../middlewares/userValidation")
const authGuard = require("../middlewares/authGuard")
const { imageUpload } = require("../middlewares/imageUpload")
const { likePhoto } = require("../controllers/PhotoController")

//routes
router.post("/register", userCreateValidation(), validate, register)
router.post("/login", loginValidation(), validate, login);
router.get("/profile", authGuard, getCurrentUser);
router.put("/update", authGuard, userUpdateValidation(), validate, imageUpload.single("profileImage"), update)
router.get("/:id", getUserById)
router.put("/like/:id", authGuard, likePhoto)

module.exports = router