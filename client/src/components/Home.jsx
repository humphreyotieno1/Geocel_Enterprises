import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';

const HomePage = ({loggedIn}) => {
  const controls = useAnimation();
  const titleControls = useAnimation();

  useEffect(() => {
    const animation = async () => {
      await controls.start({
        y: 0,
        opacity: 1,
        transition: {
          duration: 0.8,
          ease: 'easeOut',
        },
      });
      await titleControls.start({
        x: 0,
        opacity: 1,
        transition: {
          duration: 0.8,
          ease: 'easeOut',
          delay: 0.2,
        },
      });
    };
    animation();
  }, [controls, titleControls]);

  return (
    <div className="h-screen overflow-hidden">
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={controls}
        className="flex flex-col relative h-full w-full"
      >
        <img
          src="/geocel.jpg"
          alt="Geocel Enterprises Hardware"
          className="w-full h-full object-cover max-lg:object-cover"
        />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white bg-opacity-80 flex flex-col flex-grow p-4 md:p-8 rounded-lg text-center w-[250px] md:w-[500px] lg:w-[700px] h-fit max-md:mb-16">
          <motion.h1
            initial={{ x: -100, opacity: 0 }}
            animate={titleControls}
            className="text-xl md:text-3xl font-extrabold mb-2 md:mb-4"
          >
            Geocel Enterprises Hardware
          </motion.h1>
          <p className="text-lg md:text-2xl text-gray-600 italic font-semibold">
            Your partner for quality building materials!
          </p>
          <p className="text-md md:text-xl text-gray-600 mt-2 md:mt-4">
            Welcome to Geocel Enterprises Hardware, a leading provider of quality products and services.
            We are dedicated to delivering exceptional solutions that meet the needs of our valued customers.
          </p>
          <a
            href={loggedIn ? "/products" : '/login'}
            className="inline-block bg-blue-500 text-white max-w-[500px] mx-auto font-bold py-2 px-4 rounded mt-4 md:mt-6"
          >
            Find out how
          </a>
        </div>
      </motion.div>
    </div>
  );
};

export default HomePage;
