export const api = "http://localhost:5000/api"
export const uploads = "http://localhost:5000/uploads"

type imageUploadedTypes = "*.jpg" | "*.png" | "*.svg" | "*.webp"

type HttpMethod = "POST" | "GET" | "PUT" | "DELETE"

interface requestConfigProps {
   method: HttpMethod,
   data: any,
   token?: string | null,
   image?: imageUploadedTypes | null
}

interface HttpRequestProps {
   method: string,
   data?: any,
   headers: {
      [key: string]: string;
   }
}

export const requestConfig = ({ method, data, token = null, image = null }: requestConfigProps) => {

   let config: HttpRequestProps

   if (image) {
      config = {
         method,
         data: data,
         headers: {}
      }
   } else if (method === "DELETE" || data === null) {
      config = {
         method,
         headers: {}
      }
   } else {
      config = {
         method,
         data: JSON.stringify(data),
         headers: {
            "Content-Type": "application/json"
         }
      }
   }

   if (token) {
      config.headers.Authorization = `Bearer ${token}`
   }

   return config

}