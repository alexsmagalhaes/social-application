import { ReactElement } from "react";
import { Link } from "react-router-dom";

export default function Navbar(): ReactElement{
   return(
      <nav>
         <Link to="/">Logo</Link>
         
         <form>
            <input type="text"/>
         </form>

         <ul>
            <Link to="/">Home</Link>
            <Link to="/login">Login</Link>
            <Link to="/cadastrar">Cadastrar</Link>
         </ul>
      </nav>
   )
}