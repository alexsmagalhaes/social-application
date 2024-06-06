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

const getPhotoById = async (req, res) => {

   const { id } = req.params

   const photo = await Photo.findById(mongoose.Types.ObjectId(id))

   if (!photo) {
      res.status(404).json({
         errors: ["image not found"]
      })
   }

   res.status(200).json(photo)

}

const updatePhoto = async (req, res) => {

   const { id } = req.params
   const { title } = req.body

   const reqUser = req.user

   const photo = await Photo.findById(mongoose.Types.ObjectId(id))

   //check if photo existis
   if (!photo) {
      res.status(404).json({
         errors: ["photo not found"]
      })
      return;
   }

   //check if photo belongs to current user
   if (!photo.userId.equals(req._id)) {
      res.status(422).json({
         errors: ["ocured an unexpected error"]
      })
      return;
   }

   //if title was filed
   if (title) {
      photo.title = title
   }

   await photo.save()

   res.status(200).json({
      photo,
      message: "photo updated"
   })

}

//like photos
const likePhoto = async (req, res) => {

   const { id } = req.params

   const reqUser = req.user

   const photo = await Photo.findById(mongoose.Types.ObjectId(id))

   //check if photo existis
   if (!photo) {
      res.status(404).json({
         errors: ["photo not found"]
      })
      return;
   }

   //check if user alredy liked the photo
   if (photo.likes.includes(reqUser._id)) {
      res.status(422).json({
         errors: ["photo alredy liked"]
      })
      return;
   }

   //put user id into photo likes array
   photo.likes.push(reqUser._id)

   res.status(200).json({
      photoId: id,
      userId: reqUser._id,
      message: "added photo like"
   })

}

//comment funcionality 
const commentPhoto = async (req, res) => {

   const { id } = req.params
   const { comment } = req.body

   const userReq = req.user

   const user = await User.findById(mongoose.Types.ObjectId(reqUser._id))

   const photo = await Photo.findById(mongoose.Types.ObjectId(id))

   //check if photo exists
   if (!photo) {
      res.status(404).json({
         errors: ["photo not found"]
      })
      return;
   }

   //put comment in the array comments
   const userComment = {
      comment,
      userName: user.name,
      userImage: user.profileImage,
      userId: user._id
   }

   photo.comments.push(userComment)

   await photo.save()

   res.status(200).json({
      comment: userComment,
      message: "comment successfully added"
   })

}

//search photo
const searchPhoto = async (req, res) => {

   const { q } = req.query

   const photo = await Photo.find({
      title: new RedExp(q, "i").exec()
   })

   res.status(200).json(photos)

}

module.exports = {
   insertPhoto,
   deletePhoto,
   getAllPhotos,
   getUserPhotos,
   getPhotoById,
   updatePhoto,
   likePhoto,
   commentPhoto,
   searchPhoto
}