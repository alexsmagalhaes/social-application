const { validation } = require("express-validator")

const validate = (req, res, next) => {

   const errors = validationResult(req)

   if (errors.isEmpty()) {
      return next()
   }

   const extractedErros = []

   erros.array().map((err) => extractedErros.push(err.msg))

   return res.status(422).json({
      errors: extractedErros
   })
}

module.exports = validate