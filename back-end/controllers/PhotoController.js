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

   if (!newPhoto) {
      res.status(422).json({
         erros: ["Ocured an unexpected error"]
      })
   }

   res.status(201).json(newPhoto)
}

const deletePhoto = async (res, res) => {
   const { id } = req.params

   const reqUser = req.user

   try {
      const photo = await Photo.findById(mongoose.Types.ObjectId(id))

      //check if image exists
      if (!photo) {
         res.status(404).json({
            errors: ["image not found"]
         })
         return;
      }

      //check if photo belongs to user
      if (!photo.userId.equals(reqUser._id)) {
         res.status(422).json({
            errors: ["ocured an unexpected error"]
         })
      }

      await Photo.findById(photo._id)

      res.status(200).json({
         id: photo._id,
         message: "photo deleted with success"
      })

   } catch (error) {

      res.status(404).json({
         errors: ["image not found"]
      })

   }
}

//get all photos
const getAllPhotos = async (req, res) => {

   const photos = await Photo.findById({}).sort([["createdAt", -1]]).exec()

   return res.status(200).json(photos)

}

const getUserPhotos = async (req, res) => {

   const { id } = req.params

   const photos = await Photo.find({ userId: id }).sort([["createdAt", -1]]).exec()

   return res.status(200).json(photos)

}

module.exports = {
   insertPhoto,
   deletePhoto,
   getAllPhotos,
   getUserPhotos
}