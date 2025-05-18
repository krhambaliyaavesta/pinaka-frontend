"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import teamCollaboration from "/public/images/team-collaboration.svg";
import { features } from "./constants/features";

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasAuthToken, setHasAuthToken] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
    // Check for auth token on client-side
    const authToken = document.cookie.includes("auth_token");
    setHasAuthToken(authToken);
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 },
    },
  };

  const featureCardVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { type: "spring", stiffness: 100, delay: 0.4 },
    },
    hover: {
      scale: 1.05,
      boxShadow: "0px 10px 25px rgba(0,0,0,0.1)",
      transition: { type: "spring", stiffness: 400, damping: 10 },
    },
  };

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
    hover: {
      scale: 1.05,
      boxShadow: "0px 8px 15px rgba(66, 180, 172, 0.4)",
      transition: {
        type: "spring",
        stiffness: 500,
        damping: 15,
      },
    },
  };

  const renderButtons = () => {
    if (!hasAuthToken) {
      return (
        <motion.div
          className="flex flex-wrap justify-center gap-4"
          variants={itemVariants}
        >
          <motion.div variants={buttonVariants}>
            <Link
              href="/login"
              className="bg-[#42B4AC] text-white px-8 py-3 rounded-lg text-lg font-medium inline-block shadow-lg transition-all duration-300 hover:bg-[#2A9D96]"
            >
              Login
            </Link>
          </motion.div>
          <motion.div variants={buttonVariants}>
            <Link
              href="/login"
              className="bg-white text-[#42B4AC] border-2 border-[#42B4AC] px-8 py-3 rounded-lg text-lg font-medium inline-block shadow-md transition-all duration-300 hover:bg-[#F1FBF9]"
            >
              Sign Up
            </Link>
          </motion.div>
        </motion.div>
      );
    }
    return null;
  };

  const renderOnLoadDecorativeElements = () => {
    return (
      <>
        <div className="absolute top-8 left-8 w-16 h-16 bg-[#42B4AC] opacity-70 rounded-md transform -rotate-12 -z-10 hidden md:block"></div>
        <div className="absolute bottom-8 right-8 w-20 h-8 bg-[#42B4AC] opacity-70 rounded-sm -z-10 hidden md:block"></div>
        <div className="absolute bottom-20 left-1/4 w-8 h-8 bg-[#42B4AC] opacity-40 rounded-md transform rotate-45 -z-10 hidden lg:block"></div>
        <div className="absolute top-1/3 right-12 w-4 h-16 bg-[#42B4AC] opacity-30 rounded-sm transform -rotate-12 -z-10 hidden lg:block"></div>
      </>
    );
  };

  const renderAnimatedIllustration = () => {
    return (
      <motion.div
        className="mt-12 md:mt-16 flex justify-center"
        variants={itemVariants}
        transition={{ delay: 0.6 }}
      >
        <motion.div
          initial={{ y: 10 }}
          animate={{ y: -10 }}
          transition={{
            repeat: Infinity,
            repeatType: "reverse",
            duration: 2,
            ease: "easeInOut",
          }}
          className="relative w-full max-w-2xl h-64 md:h-96"
        >
          <Image
            src={teamCollaboration}
            alt="Team collaboration"
            fill
            objectFit="contain"
            className="drop-shadow-xl"
          />
        </motion.div>
      </motion.div>
    );
  };

  const renderFeatures = () => {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <motion.div
              key={index}
              className="bg-white p-8 rounded-xl shadow-md border border-gray-100"
              variants={featureCardVariants}
              transition={{ delay: index * 0.1 }}
            >
              <div className="bg-[#E8F9F7] w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <Icon className="w-8 h-8 text-[#42B4AC]" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          );
        })}
      </div>
    );
  };

  const renderHeroSection = () => {
    return (
      <motion.section
        className="flex flex-col py-16 md:py-20 relative overflow-hidden"
        initial="hidden"
        animate={isLoaded ? "visible" : "hidden"}
        variants={containerVariants}
      >
        {/* Decorative elements */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-20 h-20 bg-[#42B4AC] rounded-full opacity-20 -z-10"
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0, 0.7, 0.5, 0.7],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
        <motion.div
          className="absolute bottom-1/3 right-1/4 w-32 h-32 bg-[#42B4AC] rounded-full opacity-20 -z-10"
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0, 0.7, 0.5, 0.7],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse",
            delay: 0.2,
          }}
        />
        <motion.div
          className="absolute bottom-1/4 left-1/3 w-16 h-16 bg-[#42B4AC] rounded-full opacity-20 -z-10"
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0, 0.7, 0.5, 0.7],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse",
            delay: 0.4,
          }}
        />

        <div className="text-center mx-auto max-w-4xl px-6 mt-8">
          <motion.h1
            className="text-4xl md:text-6xl font-bold mb-6 text-gray-800 leading-tight"
            variants={itemVariants}
          >
            Welcome to <span className="text-[#42B4AC]">Pinaka</span>
            <br />
            <span className="text-3xl md:text-5xl">Team Feedback Platform</span>
          </motion.h1>

          <motion.p
            className="text-lg md:text-xl text-gray-600 mb-10 max-w-3xl mx-auto"
            variants={itemVariants}
          >
            Foster team growth through meaningful feedback, celebrate
            achievements with kudos, and build a positive workplace culture.
          </motion.p>

          {renderButtons()}
        </div>

        {renderAnimatedIllustration()}
      </motion.section>
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FFFDF5] relative overflow-hidden">
      {renderOnLoadDecorativeElements()}

      <div className="flex-grow">
        {renderHeroSection()}

        <motion.section
          className="py-16 md:py-24 bg-gradient-to-b from-white to-gray-50"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
        >
          <div className="max-w-7xl mx-auto px-6">
            <motion.h2
              className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800"
              variants={itemVariants}
            >
              Why Teams Love Pinaka
            </motion.h2>

            {renderFeatures()}
          </div>
        </motion.section>

        <motion.section
          className="py-16 md:py-24 bg-gradient-to-br from-[#42B4AC] to-[#2C9088] text-white"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
        >
          <div className="max-w-4xl mx-auto px-6 text-center">
            <motion.h2
              className="text-3xl md:text-4xl font-bold mb-6"
              variants={itemVariants}
            >
              Ready to Transform Your Team Experience?
            </motion.h2>
            <motion.p
              className="text-lg md:text-xl mb-10 opacity-90"
              variants={itemVariants}
            >
              Join thousands of teams who use Pinaka to foster growth,
              recognition, and positive workplace culture.
            </motion.p>
            <motion.div variants={itemVariants}>
              <motion.div variants={buttonVariants} className="inline-block">
                <Link
                  href="/login"
                  className="bg-white text-[#42B4AC] px-8 py-3 rounded-lg text-lg font-medium shadow-lg inline-block transition-all duration-300 hover:bg-[#F1FBF9]"
                >
                  Get Started Today
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </motion.section>
      </div>
    </div>
  );
}
