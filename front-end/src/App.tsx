import { ReactElement } from "react";
import { Outlet } from "react-router-dom";

//components
import Navbar from "./layouts/Navbar";
import Footer from "./layouts/Footer";

export default function App(): ReactElement {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  )
}