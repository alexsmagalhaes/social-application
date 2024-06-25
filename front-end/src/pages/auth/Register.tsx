import { register, reset } from "@/redux/slices/authSlice";
import { AppDispatch, RootState } from "@/redux/store";
import { FormEvent, ReactElement, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function Register(): ReactElement {

   const [name, setName] = useState("")
   const [email, setEmail] = useState("")
   const [password, setPassword] = useState("")
   const [confirmPassword, setConfirmPassword] = useState("")

   const { loading, error } = useSelector((state: RootState) => state.auth)

   const dispatch = useDispatch<AppDispatch>();


   const handleSubmit = (e: FormEvent) => {
      e.preventDefault()

      const user = {
         name,
         email,
         password,
         confirmPassword
      }

      dispatch(register(user))

   }

   useEffect(() => {
      dispatch(reset())
   }, [dispatch])

   return (
      <main>
         <form onSubmit={(e) => handleSubmit(e)}>
            <input
               type="text"
               placeholder="Nome"
               onChange={(e) => setName(e.target.value)}
               value={name || ""}
            />
            <input
               type="email"
               placeholder="Email"
               onChange={(e) => setEmail(e.target.value)}
               value={email || ""}
            />
            <input
               type="password"
               placeholder="Senha"
               onChange={(e) => setPassword(e.target.value)}
               value={password || ""}
               autoComplete="password"
            />
            <input
               type="password"
               placeholder="Confirme a senha"
               onChange={(e) => setConfirmPassword(e.target.value)}
               value={confirmPassword || ""}
               autoComplete="confirme-password"
            />

            <button type="submit">Cadastrar</button>
         </form>

         <div>
            <span>Já possui uma conta?</span>
            <Link to="/login">Faça login</Link>
         </div>
      </main>
   )
}