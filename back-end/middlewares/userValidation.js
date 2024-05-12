const { body } = require("express-validator")

const userCreateValidation = () => {
   return [
      body("name")
         .isString()
         .withMessage("name is required")
         .isLength({ min: 3 })
         .withMessage("name minimun size is 3"),

      body("email")
         .isString()
         .withMessage("email is required")
         .isEmail()
         .withMessage("insert a valid email"),

      body("password")
         .isString()
         .withMessage("password is required")
         .isLength({ min: 8 })
         .withMessage("password minimun size is 8"),

      body("confirmpassword")
         .isString()
         .withMessage("confirmpassword confirmation is required")
         .custom((value, { req }) => {
            if (value != req.body.password) {
               throw new Error("confirmpassword are not equals")
            }
            return true
         })
   ]
}

const loginValidation = () => {
   return [
      body("email")
         .isString()
         .withMessage("email is required")
         .isEmail()
         .withMessage("insert a valid email"),
      body("password").isString().withMessage("password is required"),
   ];
};

module.exports = {
   userCreateValidation,
   loginValidation
}