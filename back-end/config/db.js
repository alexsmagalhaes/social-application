const mongoose = require("mongoose")

const dbUser = process.env.DB_USER
const dbPassword = process.env.DB_PASSWORD

const conn = async () => {
   try {

      const dbConnect = await mongoose.connect(`mongodb+srv://${dbUser}:${dbPassword}@cluster0.okgmt6j.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`)

      console.log("Connection completed")

      return dbConnect

   } catch (error) {
      console.log(error)
   }
}

conn()

module.exports = conn