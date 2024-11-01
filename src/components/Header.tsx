import React, { useState, useEffect } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { useLocation, Link } from "react-router-dom";

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [faviconUrl, setFaviconUrl] = useState("");
  const [pageTitle, setPageTitle] = useState("");
  
  const location = useLocation(); // Get the current location

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    // Get the favicon URL from the <link> tag in the document head
    const link = document.querySelector("link[rel*='icon']") as HTMLLinkElement;
    if (link) {
      setFaviconUrl(link.href);
    }

    // Get the page title from the document
    setPageTitle(document.title);
  }, []);

  // Function to determine if the current path matches the menu item's path
  const isActive = (path: string) => location.pathname === path ? 'bg-green-600 text-white' : 'text-gray-300 hover:bg-green-600';

  return (
    <nav className="bg-green-800 text-white w-full z-10">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="flex items-center">
            {/* Logo from favicon */}
            {faviconUrl && (
              <img
                src={faviconUrl}
                alt="Logo"
                className="h-10 w-10 rounded-full border-2 border-white mr-2"
              />
            )}
            {/* Dynamic Title */}
            <span className="text-2xl font-bold">{pageTitle}</span>
          </div>
          <div className="hidden sm:block">
            <div className="flex space-x-4">
              <Link to="/app-mod/" className={`rounded-md px-3 py-2 text-sm font-medium ${isActive('/app-mod/')}`}>Home</Link>
              <Link to="/app-mod/apps" className={`rounded-md px-3 py-2 text-sm font-medium ${isActive('/app-mod/apps')}`}>Aplikasi Mod</Link>
              <Link to="/app-mod/about" className={`rounded-md px-3 py-2 text-sm font-medium ${isActive('/app-mod/about')}`}>Tentang Kami</Link>
              <Link to="/app-mod/contact" className={`rounded-md px-3 py-2 text-sm font-medium ${isActive('/app-mod/contact')}`}>Kontak</Link>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center sm:hidden">
            <button
              type="button"
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 text-gray-400 hover:bg-green-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? <FaTimes className="h-6 w-6" /> : <FaBars className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`${isOpen ? "block" : "hidden"} absolute inset-x-0 top-16 bg-green-700 sm:hidden z-20`}
      >
        <div className="space-y-1 px-2 pb-3 pt-2">
          <Link to="/app-mod/" className={`block rounded-md px-3 py-2 text-base font-medium ${isActive('/app-mod/')}`}>Home</Link>
          <Link to="/app-mod/apps" className={`block rounded-md px-3 py-2 text-base font-medium ${isActive('/app-mod/apps')}`}>Aplikasi Mod</Link>
          <Link to="/app-mod/about" className={`block rounded-md px-3 py-2 text-base font-medium ${isActive('/app-mod/about')}`}>Tentang Kami</Link>
          <Link to="/app-mod/contact" className={`block rounded-md px-3 py-2 text-base font-medium ${isActive('/app-mod/contact')}`}>Kontak</Link>
        </div>
      </div>
    </nav>
  );
};

export default Header;
