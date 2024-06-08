import { ReactElement } from "react";
import { Outlet } from "react-router-dom";

//components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export default function App(): ReactElement {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  )
}