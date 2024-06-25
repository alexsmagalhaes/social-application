import { api, requestConfig } from "@/utils/config"
import axios from "axios"

//register a new user in the system
const register = async (data: any) => {

   const config = requestConfig({ method: "POST", data })

   const url = `${api}/users/register`

   try {

      const response = await axios.request({
         url,
         ...config
      })

      if (response) {
         localStorage.setItem("user", JSON.stringify(response))
      }

   } catch (errors: any) {
      console.log(errors.response.data);
   }
}

const authService = {
   register
}

export default authService