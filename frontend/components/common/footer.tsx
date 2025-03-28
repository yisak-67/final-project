import React from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear(); // Get the current year
  return (
    <footer className=" bottom-0 left-0 w-full bg-white shadow flex items-center justify-between p-4">
      <div className="ml-64 pl-7">
        <h1 className="text-gray-600">© {currentYear} Land Registery</h1>
      </div>
      <div className="flex space-x-4">
        <a className="text-gray-600 hover:text-gray-800" href="#">
          Terms
        </a>
        <a className="text-gray-600 hover:text-gray-800" href="#">
          Privacy
        </a>
        <a className="text-gray-600 hover:text-gray-800" href="#">
          Help
        </a>
      </div>
    </footer>
  );
};

export default Footer;
