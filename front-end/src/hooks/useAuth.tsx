import { RootState } from "@/redux/store"
import { ReactElement, useEffect, useState } from "react"
import { useSelector } from "react-redux"

export default function useAuth() {

   const { user } = useSelector((state: RootState) => state.auth)

   const [auth, setAuth] = useState(false)
   const [loading, setLoading] = useState(true)

   useEffect(() => {
      if (user) {
         setAuth(true)
      } else {
         setAuth(false)
      }

      setLoading(false)

   }, [user])

   return { auth, loading }
}


interface AuthRouteProps {
   freeAccess: ReactElement;
   restrictAccess: ReactElement;
}

export function AuthRoute({ freeAccess, restrictAccess }: AuthRouteProps) {
   const { auth } = useAuth();

   return auth ? restrictAccess : freeAccess;
};