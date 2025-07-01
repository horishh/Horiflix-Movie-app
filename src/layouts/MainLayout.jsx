import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import MobileNavbar from "../components/Navbar/MobileNavbar";
import Footer from "../components/Footer";
import "../components/Navbar/navbar.css";

const MainLayout = () => {
  return (
    <div className="content">
      <Navbar />
      <Outlet />
      <MobileNavbar />
      <Footer />
    </div>
  );
};

export default MainLayout;
