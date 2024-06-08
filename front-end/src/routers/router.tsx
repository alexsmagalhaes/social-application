import { createBrowserRouter } from "react-router-dom";
import App from "@/App";

//pages
import Home from "@/pages/Home";
import Login from "@/pages/auth/Login";
import Register from "@/pages/auth/Register";
import NotFound from "@/pages/NotFound";

export const router = createBrowserRouter([
   {
      path: "/",
      element: <App />,
      errorElement: <NotFound />,
      
      children: [{
         path: "/",
         element: <Home />
      }, {
         path: "/login",
         element: <Login />
      }, {
         path: "/cadastrar",
         element: <Register />
      }]
   },
])