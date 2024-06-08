import { FormEvent, ReactElement, useState } from "react";
import { Link } from "react-router-dom";

export default function Register(): ReactElement {

   const [nome, setNome] = useState("")
   const [email, setEmail] = useState("")
   const [password, setPassword] = useState("")
   const [confirmPassword, setConfirmPassword] = useState("")

   const handleSubmit = (e: FormEvent) => {
      e.preventDefault()

      const user = {
         nome,
         email,
         password,
         confirmPassword
      }

      console.log(user)

   }

   return (
      <main>
         <form onSubmit={(e) => handleSubmit(e)}>
            <input
               type="text"
               placeholder="Nome"
               onChange={(e) => setNome(e.target.value)}
               value={nome || ""}
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