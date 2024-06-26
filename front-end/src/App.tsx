import { ReactElement } from "react";
import { Outlet } from "react-router-dom";

//components
import Navbar from "./layouts/Navbar";
import Footer from "./layouts/Footer";
import useAuth from "./hooks/useAuth";

export default function App(): ReactElement {

  const { loading } = useAuth()

  if (loading) {
    return (
      <div>
        loading...
      </div>
    )
  }

  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  )
}