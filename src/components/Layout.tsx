import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

const Layout: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <Header />


        <Outlet />
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Layout;
