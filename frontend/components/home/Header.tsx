import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";

import { Link as LinkScroll } from "react-scroll";
import { useTheme } from "next-themes";

const Header = () => {
  const router = useRouter();
  const [activeLink, setActiveLink] = useState("");
  const [scrollActive, setScrollActive] = useState(false);
  const [navbar, setNavbar] = useState(false);
  useEffect(() => {
    window.addEventListener("scroll", () => {
      setScrollActive(window.scrollY > 20);
    });
  }, []);
  const { systemTheme, theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  const currentTheme = theme === "system" ? systemTheme : theme;
  return (
    <>
      <header
        className={
          "fixed top-0 w-full  z-30 bg-white-500 transition-all md:block " +
          (scrollActive ? " shadow-green pt-0" : " pt-4")
        }
      >
        <nav className="max-w-screen-xl px-6 sm:px-8 lg:px-16 mx-auto grid grid-flow-col py-3 sm:py-4 ">
          <img height={50} width={150} src="/Icons/newlogo.png" />
          <ul className="hidden lg:flex col-start-4 col-end-8 text-black-500  items-center">
            <LinkScroll
              activeClass="active"
              to="about"
              spy={true}
              smooth={true}
              duration={1000}
              onSetActive={() => {
                setActiveLink("about");
              }}
              className={
                "px-4 py-2 mx-2 cursor-pointer animation-hover inline-block relative" +
                (activeLink === "about"
                  ? " text-green-500 animation-active "
                  : " text-black-500 hover:text-green-500 a")
              }
            >
              About
            </LinkScroll>
            <LinkScroll
              activeClass="active"
              to="feature"
              spy={true}
              smooth={true}
              duration={1000}
              onSetActive={() => {
                setActiveLink("feature");
              }}
              className={
                "px-4 py-2 mx-2 cursor-pointer animation-hover inline-block relative" +
                (activeLink === "feature"
                  ? " text-green-500 animation-active "
                  : " text-black-500 hover:text-green-500 ")
              }
            >
              Services
            </LinkScroll>
            <LinkScroll
              activeClass="active"
              to="pricing"
              spy={true}
              smooth={true}
              duration={1000}
              onSetActive={() => {
                setActiveLink("pricing");
              }}
              className={
                "px-4 py-2 mx-2 cursor-pointer animation-hover inline-block relative" +
                (activeLink === "pricing"
                  ? " text-green-500 animation-active "
                  : " text-black-500 hover:text-green-500 ")
              }
            >
              FAQ
            </LinkScroll>
          </ul>
          <div className=" hidden lg:flex col-start-10 col-end-12 font-medium flex justify-end items-center">
            <Link
              href="p_auth/login"
              className="text-black-600 mx-2 sm:mx-4 capitalize tracking-wide hover:text-green-500 transition-all"
            >
              Sign In
            </Link>

            <button
              className="font-medium tracking-wide py-2 px-5 sm:px-8 border border-green-500 text-green-500 bg-white-500 outline-none rounded-l-full rounded-r-full capitalize hover:bg-green-500 hover:text-white transition-all hover:shadow-green "
              onClick={() => router.push("/p_auth/register")}
            >
              Sign Up
            </button>
            <div>
              <div className="flex justify-center">
                {currentTheme === "dark" ? (
                  <button
                    className="bg-black-700 hover:bg-black w-28 rounded-md  p-4"
                    onClick={() => setTheme("light")}
                  >
                    {" "}
                    <Image
                      src="Icons/sun.svg"
                      alt="logo"
                      height={30}
                      width={30}
                    />
                  </button>
                ) : (
                  <button
                    className=" w-28 rounded-md   p-4 hover:bg-gray-300"
                    onClick={() => setTheme("dark")}
                  ></button>
                )}
              </div>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Header;
