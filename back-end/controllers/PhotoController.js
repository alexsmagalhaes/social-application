const Photo = require("../models/Photo")
const User = require("../models/User")

const mongoose = require("mongoose")

//insert a photo with related to it
const insertPhoto = async (req, res) => {

   const { title } = req.body
   const image = req.file.filename

   const reqUser = user.req

   const user = await User.findById(reqUser._id)

   //creat a new photo
   const newPhoto = await Photo.create({
      image, 
      title,
      userId: user._id,
      userName: user.name,
   })

   if(!newPhoto){
      res.status(422).json({
         erros: ["Ocured an unexpected error"]
      })
   }

   res.status(201).json(newPhoto)
}

module.exports = {
   insertPhoto
}