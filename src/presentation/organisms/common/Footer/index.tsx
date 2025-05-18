"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { FaGithub, FaTwitter, FaLinkedin } from "react-icons/fa";

interface FooterProps {
  companyName?: string;
  contained?: boolean;
}

export const Footer: React.FC<FooterProps> = ({
  companyName = "Avesta Legends",
  contained = true,
}) => {
  // Width classes based on contained prop
  const containerWidthClass = contained ? "max-w-screen-xl" : "max-w-[1672px]";

  return (
    <footer className="py-8 mt-auto">
      <div className={`${containerWidthClass} mx-auto px-6 md:px-9`}>
        <div className="bg-white rounded-lg lg:rounded-2xl border border-gray-100 shadow-[0px_5px_18px_rgba(204,_204,_204,_0.1)] p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Logo and company info */}
            <div className="flex flex-col items-center md:items-start">
              <Link href="/" className="flex items-center mb-3 gap-2">
                <div className="relative w-8 h-8">
                  <Image
                    src="/images/pinaka_logo.png"
                    alt="Pinaka Logo"
                    width={32}
                    height={32}
                    className="object-contain"
                  />
                </div>
                <h2 className="text-base font-semibold text-gray-800">
                  Pinaka
                </h2>
              </Link>
              <p className="text-sm text-gray-600 text-center md:text-left">
                A platform for team feedback and kudos sharing.
              </p>
            </div>

            {/* Quick links */}
            <div className="flex flex-col items-center md:items-start">
              <h3 className="font-semibold text-gray-800 mb-3">Quick Links</h3>
              <nav className="flex flex-col space-y-2">
                <Link
                  href="/"
                  className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Home
                </Link>
                <Link
                  href="/kudos-wall"
                  className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Kudos Wall
                </Link>
                <Link
                  href="/login"
                  className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Login
                </Link>
              </nav>
            </div>

            {/* Social and copyright */}
            <div className="flex flex-col items-center md:items-start">
              <h3 className="font-semibold text-gray-800 mb-3">Connect</h3>
              <div className="flex space-x-4 mb-3">
                <a
                  href="#"
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  <FaGithub size={18} />
                </a>
                <a
                  href="#"
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  <FaTwitter size={18} />
                </a>
                <a
                  href="#"
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  <FaLinkedin size={18} />
                </a>
              </div>
              <p className="text-xs text-gray-500 text-center md:text-left">
                &copy; {new Date().getFullYear()} {companyName}. All rights
                reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
