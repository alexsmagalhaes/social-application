const multer = require("multer")
const path = require("path")

//destination to store image
const imageStore = multer.diskStorage({
   destination: (req, file, cd) => {
      let folder = ""

      if (req.baseUrl.includes("users")) {
         folder = "users"
      } else if (req.baseUrl.includes("photos")) {
         folder = "photos"
      }

      cd(null, `uploads/${folder}/`)
   },
   filename: (req, file, cd) => {
      cd(null, Date.now() + path.extname(file.originalname))
   }
})

const imageUpload = multer({
   storage: imageStore,
   fileFilter: (req, file, cd) => {
      if (!file.originalname.match(/\.(png|jpg)$/)) {

         // only png e jpg formats
         return cd(new Error('upload only png or jpg formats'))

      }

      cd(undefined, true)
   }
})

module.exports = { imageUpload }