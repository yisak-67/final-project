import Image from "next/image";
import React, { useMemo } from "react";
import { motion } from "framer-motion";
import getScrollAnimation from "./getScrollAnimation";
import ScrollAnimationWrapper from "./ScrollAnimationWrapper";

const features = [
  {
    title: "Reliable Land Registration",
    description: "Secure and tamper-proof registration process using blockchain technology."
  },
  {
    title: "Buy and Sell Land",
    description: "Seamless marketplace for land transactions with verified listings."
  },
  {
    title: "Crypto Payments",
    description: "Safe and fast transactions using cryptocurrency options."
  },
  {
    title: "Interactive Maps",
    description: "Visualize land locations with our detailed mapping system."
  },
  {
    title: "Secure Digital Assets",
    description: "Store documents securely in IPFS with blockchain verification."
  },
  {
    title: "24/7 Access",
    description: "Manage your properties anytime, anywhere with our platform."
  },
];

const Feature = () => {
  const scrollAnimation = useMemo(() => getScrollAnimation(), []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 bg-gray-50" id="feature">
      <div className="text-center mb-16">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Our Services</h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Comprehensive tools for all your land administration needs in one platform.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <ScrollAnimationWrapper className="order-2 md:order-1">
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 gap-6"
            variants={scrollAnimation}
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
                variants={scrollAnimation}
                custom={{ duration: 0.5 + index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div className="flex items-center mb-4">
                  <div className="bg-green-100 p-2 rounded-full mr-4">
                    <div className="bg-green-600 w-8 h-8 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold">{index + 1}</span>
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">{feature.title}</h3>
                </div>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </ScrollAnimationWrapper>

        <ScrollAnimationWrapper className="order-1 md:order-2">
          <motion.div className="relative w-full h-64 sm:h-80 md:h-96" variants={scrollAnimation}>
            <Image
              src="/images/Illustration2.png"
              alt="Feature illustration"
              layout="fill"
              objectFit="contain"
              quality={100}
            />
          </motion.div>
        </ScrollAnimationWrapper>
      </div>
    </div>
  );
};

export default Feature;