const Footer = () => {
  return (
    <footer className="bg-green-800 text-white shadow mt-45 w-full">
      <div className="max-w-screen-xl mx-auto p-4 md:flex md:items-center md:justify-between">
        <span className="text-sm sm:text-center">
          © 2023 <a href="https://yourwebsiteurl.com" className="hover:underline">Kedai Mod</a>. All Rights Reserved.
        </span>
        <ul className="flex flex-wrap items-center mt-3 text-sm font-medium sm:mt-0">
          <li>
            <a href="#" className="hover:underline me-4 md:me-6">About</a>
          </li>
          <li>
            <a href="#" className="hover:underline me-4 md:me-6">Privacy Policy</a>
          </li>
          <li>
            <a href="#" className="hover:underline me-4 md:me-6">Licensing</a>
          </li>
          <li>
            <a href="#" className="hover:underline">Contact</a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
