const User = require("../models/User");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

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

const login = async (req, res) => {
   const { email, password } = req.body;

   const user = await User.findOne({ email });

   //check if user exists
   if (!user) {
      res.status(404).json({ errors: ["user not found"] });
      return;
   }

   //check if password matches
   if (!(await bcrypt.compare(password, user.password))) {
      res.status(422).json({ errors: ["invalid password"] });
      return;
   }

   //return user with token
   res.status(200).json({
      _id: user._id,
      profileImage: user.profileImage,
      token: generateToken(user._id),
   });
};

//get current user logged
const getCurrentUser = async (req, res) => {
   const user = req.user

   res.status(200).json(user)
}


//update user
const update = async (req, res) => {
   const { name, password, bio } = req.body;

   let profileImage = null;

   if (req.file) {
      profileImage = req.file.filename;
   }

   const reqUser = req.user;
   const userId = new mongoose.Types.ObjectId(reqUser._id);
   const user = await User.findById(userId).select("-password");


   if (name) {
      user.name = name;
   }

   if (password) {
      const salt = await bcrypt.genSalt();
      const passwordHash = await bcrypt.hash(password, salt);
      user.password = passwordHash;
   }

   if (profileImage) {
      user.profileImage = profileImage;
   }

   if (bio) {
      user.bio = bio;
   }

   await user.save();


   res.status(200).json(user);
};

module.exports = {
   register,
   login,
   getCurrentUser,
   update
};