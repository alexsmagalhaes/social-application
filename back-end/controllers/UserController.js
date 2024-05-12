const User = require("../models/User");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { default: mongoose } = require("mongoose");

const jwtSecret = process.env.JWT_SECRET;

//generate user token
const generateToken = (id) => {
   return jwt.sign({ id }, jwtSecret, {
      expiresIn: "7d",
   });
};

//register user and sign in
const register = async (req, res) => {
   const { name, email, password } = req.body;

   // check if user exists
   const user = await User.findOne({ email });

   if (user) {
      res.status(422).json({ errors: ["email alredy in use"] });
      return;
   }

   //generate password hash
   const salt = await bcrypt.genSalt();
   const passwordHash = await bcrypt.hash(password, salt);

   //greate user
   const newUser = await User.create({
      name,
      email,
      password: passwordHash,
   });

   //if user was created sucessfully, return the token
   if (!newUser) {
      res.status(422).json({
         errors: ["Houve um erro, por favor tente novamente mais tarde."],
      });
      return;
   }

   res.status(201).json({
      _id: newUser._id,
      token: generateToken(newUser._id),
   });
};

module.exports = {
   register,
};