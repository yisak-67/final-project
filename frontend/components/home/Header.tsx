import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { Link as LinkScroll } from "react-scroll";
import { useTheme } from "next-themes";
import { FiMenu, FiX, FiSun, FiMoon } from "react-icons/fi";

const Header = () => {
  const router = useRouter();
  const [activeLink, setActiveLink] = useState("");
  const [scrollActive, setScrollActive] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { systemTheme, theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    window.addEventListener("scroll", () => {
      setScrollActive(window.scrollY > 20);
    });
  }, []);

  if (!mounted) return null;
  const currentTheme = theme === "system" ? systemTheme : theme;

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrollActive ? "bg-white shadow-md py-2" : "bg-white py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Image
              src="/Icons/newlogo.png"
              alt="Logo"
              width={150}
              height={50}
              className="cursor-pointer"
              onClick={() => router.push("/")}
            />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <nav className="flex space-x-8">
              <LinkScroll
                activeClass="active"
                to="about"
                spy={true}
                smooth={true}
                duration={500}
                onSetActive={() => setActiveLink("about")}
                className={`px-3 py-2 text-sm font-medium transition-colors duration-300 ${
                  activeLink === "about"
                    ? "text-green-600 border-b-2 border-green-600"
                    : "text-gray-700 hover:text-green-600"
                }`}
              >
                About
              </LinkScroll>
              <LinkScroll
                activeClass="active"
                to="feature"
                spy={true}
                smooth={true}
                duration={500}
                onSetActive={() => setActiveLink("feature")}
                className={`px-3 py-2 text-sm font-medium transition-colors duration-300 ${
                  activeLink === "feature"
                    ? "text-green-600 border-b-2 border-green-600"
                    : "text-gray-700 hover:text-green-600"
                }`}
              >
                Services
              </LinkScroll>
              <LinkScroll
                activeClass="active"
                to="pricing"
                spy={true}
                smooth={true}
                duration={500}
                onSetActive={() => setActiveLink("pricing")}
                className={`px-3 py-2 text-sm font-medium transition-colors duration-300 ${
                  activeLink === "pricing"
                    ? "text-green-600 border-b-2 border-green-600"
                    : "text-gray-700 hover:text-green-600"
                }`}
              >
                FAQ
              </LinkScroll>
            </nav>

            <div className="flex items-center space-x-4">
              <Link
                href="/p_auth/login"
                className="text-gray-700 hover:text-green-600 px-3 py-2 text-sm font-medium transition-colors duration-300"
              >
                Sign In
              </Link>
              <button
                onClick={() => router.push("/p_auth/register")}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-full text-sm font-medium transition-colors duration-300 shadow-md"
              >
                Sign Up
              </button>
              {/* <button
                onClick={() => setTheme(currentTheme === "dark" ? "light" : "dark")}
                className="p-2 rounded-full text-gray-700 hover:text-green-600 focus:outline-none"
                aria-label="Toggle theme"
              >
                {currentTheme === "dark" ? (
                  <FiSun className="w-5 h-5" />
                ) : (
                  <FiMoon className="w-5 h-5" />
                )}
              </button> */}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-green-600 focus:outline-none"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <FiX className="block h-6 w-6" />
              ) : (
                <FiMenu className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <LinkScroll
              activeClass="active"
              to="about"
              spy={true}
              smooth={true}
              duration={500}
              onSetActive={() => setActiveLink("about")}
              onClick={toggleMenu}
              className={`block px-3 py-2 text-base font-medium ${
                activeLink === "about"
                  ? "text-green-600 bg-green-50"
                  : "text-gray-700 hover:text-green-600 hover:bg-green-50"
              }`}
            >
              About
            </LinkScroll>
            <LinkScroll
              activeClass="active"
              to="feature"
              spy={true}
              smooth={true}
              duration={500}
              onSetActive={() => setActiveLink("feature")}
              onClick={toggleMenu}
              className={`block px-3 py-2 text-base font-medium ${
                activeLink === "feature"
                  ? "text-green-600 bg-green-50"
                  : "text-gray-700 hover:text-green-600 hover:bg-green-50"
              }`}
            >
              Services
            </LinkScroll>
            <LinkScroll
              activeClass="active"
              to="pricing"
              spy={true}
              smooth={true}
              duration={500}
              onSetActive={() => setActiveLink("pricing")}
              onClick={toggleMenu}
              className={`block px-3 py-2 text-base font-medium ${
                activeLink === "pricing"
                  ? "text-green-600 bg-green-50"
                  : "text-gray-700 hover:text-green-600 hover:bg-green-50"
              }`}
            >
              FAQ
            </LinkScroll>
            <div className="pt-4 pb-2 border-t border-gray-200">
              <div className="flex items-center justify-between px-3">
                <Link
                  href="/p_auth/login"
                  className="text-gray-700 hover:text-green-600 px-3 py-2 text-base font-medium"
                  onClick={toggleMenu}
                >
                  Sign In
                </Link>
                <button
                  onClick={() => {
                    router.push("/p_auth/register");
                    toggleMenu();
                  }}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-full text-base font-medium"
                >
                  Sign Up
                </button>
              </div>
              {/* <div className="mt-3 px-3">
                <button
                  onClick={() => setTheme(currentTheme === "dark" ? "light" : "dark")}
                  className="w-full flex justify-center p-2 rounded-full text-gray-700 hover:text-green-600"
                >
                  {currentTheme === "dark" ? (
                    <FiSun className="w-6 h-6" />
                  ) : (
                    <FiMoon className="w-6 h-6" />
                  )}
                  <span className="ml-2">
                    {currentTheme === "dark" ? "Light Mode" : "Dark Mode"}
                  </span>
                </button>
              </div> */}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;