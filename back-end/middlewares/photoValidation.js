const { body } = require("express-validator")

const photoInsertValidation = (req, res, next) => {
   return [
      body("title")
         .not()
         .equals("undefined")
         .withMessage("title is required")
         .isString()
         .withMessage("title is required")
         .isLength({ min: 3 })
         .withMessage("title minimun size is 3"),

      body("image")
         .custom((value, { req }) => {
            if (!req.file) {
               throw new Error("image is required")
            }
            return true
         })
   ]
}

const photoUpdateValidation = (req, res, next) => {
   return [
      body("title")
         .optional()
         .isString()
         .withMessage("title is required")
         .isLength({ min: 3 })
         .withMessage("title minimun size is 3"),
   ]
}

module.exports = {
   photoInsertValidation,
   photoUpdateValidation
}