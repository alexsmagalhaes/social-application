import { api, requestConfig } from "@/utils/config"
import axios from "axios"

// Register a new user in the system
const register = async (data: any) => {
   const config = requestConfig({ method: "POST", data })
   const url = `${api}/users/register`

   try {
      const res = await axios.request({
         url,
         ...config
      })

      if (res && res.data) {
         localStorage.setItem("user", JSON.stringify(res.data))
         return res.data
      }

   } catch (error: any) {
      if (error.response && error.response.data) {
         console.error(error.response.data)
         return error.response.data
      } else {
         console.error(error.message)
      }
   }
}

const authService = {
   register
}

export default authService
