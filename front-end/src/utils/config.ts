export const api = "https://localhost:5000/api"
export const uploads = "https://localhost:5000/uploads"

type imageUploadedTypes = "*.jpg" | "*.png" | "*.svg" | "*.webp"

interface requestConfigProps {
   method: string,
   data: any,
   token: string | null,
   image: imageUploadedTypes | null
}

interface HttpRequestProps {
   method: string,
   body?: any,
   headers: {
      [key: string]: string;
   }
}

export const requestConfig = ({ method, data, token = null, image = null }: requestConfigProps) => {

   let config: HttpRequestProps

   if (image) {
      config = {
         method,
         body: data,
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
         body: JSON.stringify(data),
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