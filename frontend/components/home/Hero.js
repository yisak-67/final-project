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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16 md:pt-40 md:pb-24">
      <ScrollAnimationWrapper>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center"
          variants={scrollAnimation}
        >
          <div className="order-2 md:order-1 text-center md:text-left">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
              Buy, Sell, Register <span className="text-green-600">Lands</span>{" "}
              with Ease!
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-lg mx-auto md:mx-0">
              Simplifying Land Management. Register, sell, and buy land
              effortlessly with our intuitive platform. Access resources,
              streamline transactions, and make informed decisions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <button
                onClick={() => router.push("/p_auth/register")}
                className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-8 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Get Started
              </button>
              <button
                onClick={() => router.push("#feature")}
                className="border-2 border-green-600 text-green-600 hover:bg-green-50 font-semibold py-3 px-8 rounded-full transition-all duration-300"
              >
                Learn More
              </button>
            </div>
          </div>
          <div className="order-1 md:order-2">
            <motion.div
              className="relative w-full h-64 sm:h-80 md:h-96 lg:h-[28rem]"
              variants={scrollAnimation}
            >
              <Image
                src="/images/Illustration1.png"
                alt="Hero image"
                layout="fill"
                objectFit="contain"
                quality={100}
                priority
              />
            </motion.div>
          </div>
        </motion.div>
      </ScrollAnimationWrapper>
    </div>
  );
};

export default Hero;