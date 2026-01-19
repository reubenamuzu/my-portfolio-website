import { assets } from "@/assets/assets";
import Image from "next/image";
import React from "react";
import { FaLinkedinIn, FaGithub, FaInstagram } from "react-icons/fa"; // Socials icons

const Footer = ({isDarkMode}) => {
  return (
    <div className="mt-20">
      <div className="text-center">
        <Image src={isDarkMode ? assets.logo_dark :  assets.logo} alt="" className="w-36 mx-auto mb-2" />

        <div className="w-max flex items-center gap-2 mx-auto">
          <Image src={isDarkMode ? assets.mail_icon_dark : assets.mail_icon} alt="" className="w-6" />
          reubenamuzu23@gmail.com
        </div>
      </div>

      {/* 🌐 Social Media Icons */}
      <div className="flex items-center justify-center gap-6 mt-3">
        <a
          href="https://www.linkedin.com/in/reuben-korsi-amuzu-b4bb82385"
          target="_blank"
          rel="noopener noreferrer"
          className="p-3 rounded-full border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-300"
        >
          <FaLinkedinIn className="text-2xl text-gray-700 dark:text-gray-300 hover:text-blue-600 transition-colors" />
        </a>
        <a
          href="https://github.com/Amson-tECH"
          target="_blank"
          rel="noopener noreferrer"
          className="p-3 rounded-full border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-300"
        >
          <FaGithub className="text-2xl text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors" />
        </a>
        <a
          href="https://www.instagram.com/mrr_reuben?igsh=MW1zOWw1Mm5qbTJpdg%3D%3D&utm_source=qr"
          target="_blank"
          rel="noopener noreferrer"
          className="p-3 rounded-full border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-300"
        >
          <FaInstagram className="text-2xl text-gray-700 dark:text-gray-300 hover:text-pink-500 transition-colors" />
        </a>
      </div>

      <div className="text-center sm:flex items-center justify-center border-t border-gray-400 mx-[10%] mt-6 py-6">
        <p>
          {" "}
          © {new Date().getFullYear()} Reuben Korsi Amuzu. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;
