import { Navigate, createBrowserRouter } from "react-router-dom";
import App from "@/App";
import { AuthRoute } from "@/hooks/useAuth";

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
         element: <AuthRoute
            freeAccess={<Navigate to="/login" />}
            restrictAccess={<Home />}
         />
      }, {
         path: "/login",
         element: <AuthRoute
            freeAccess={<Login />}
            restrictAccess={<Navigate to="/" />}
         />
      }, {
         path: "/cadastrar",
         element: <AuthRoute
            freeAccess={<Register />}
            restrictAccess={<Navigate to="/" />}
         />
      }]
   },
])