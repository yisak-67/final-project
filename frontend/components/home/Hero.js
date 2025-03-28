import React, { useMemo } from "react";
import Image from "next/image";
import { useRouter } from "next/router";

import { motion } from "framer-motion";
import getScrollAnimation from "./getScrollAnimation";
import ScrollAnimationWrapper from "./ScrollAnimationWrapper";

const Hero = () => {
  const router = useRouter();
  const scrollAnimation = useMemo(() => getScrollAnimation(), []);

  return (
    <div className="max-w-screen-xl mt-24 px-8 xl:px-16 mx-auto" id="about">
      <ScrollAnimationWrapper>
        <motion.div
          className="grid grid-flow-row sm:grid-flow-col grid-rows-2 md:grid-rows-1 sm:grid-cols-2 gap-8 py-6 sm:py-16"
          variants={scrollAnimation}
        >
          <div className=" flex flex-col justify-center items-start row-start-2 sm:row-start-1">
            <h1 className="text-3xl lg:text-4xl xl:text-5xl font-medium text-black-600 leading-normal">
              Buy, Sell, Register <strong>lands</strong> with ease!
            </h1>
            <p className="text-black-500 mt-4 mb-6">
              Simplifying Land Management. Register, sell, and buy land
              effortlessly with our intuitive platform. Access resources,
              streamline transactions, and make informed decisions. Experience
              seamless land administration today.
            </p>

            <button
              onClick={() => router.push("/p_auth/register")}
              className={
                "py-3 lg:py-4 px-12 lg:px-16 text-white-500 font-semibold rounded-lg bg-green-500 hover:shadow-green-md transition-all outline-none "
              }
            >
              Get Started
            </button>
          </div>
          <div className="flex w-full">
            <motion.div className="h-full w-full" variants={scrollAnimation}>
              <Image
                src="/images/Illustration1.png"
                alt="Hero image"
                quality={100}
                width={612}
                height={383}
              />
            </motion.div>
          </div>
        </motion.div>
      </ScrollAnimationWrapper>
    </div>
  );
};

export default Hero;
