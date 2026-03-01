"use client";
import { assets } from "@/assets/assets";
import { Button } from "@/app/components/ui/button";
import Image from "next/image";
import React from "react";
import { motion } from "motion/react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/components/ui/dialog";

const Header = ({ isDarkMode }) => {
  return (
    <div className="w-11/12 max-w-3xl text-center mx-auto h-screen flex flex-col items-center justify-center gap-4">
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <Image src={assets.profile_img} alt="" className="rounded-full w-32" />
      </motion.div>
      <motion.h3
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
        className="flex items-end gap-2 text-xl md:text-2xl mb-3 font-Ovo"
      >
        Hi! I'm Reuben Korsi Amuzu
        <Image src={assets.hand_icon} alt="" className="w-6" />
      </motion.h3>
      <motion.h1
        initial={{ y: -30, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="text-3xl sm:text-6xl lg:text-[66px] font-Ovo"
      >
        Software Developer based in Ghana
      </motion.h1>
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.7 }}
        className="max-w-2xl mx-auto font-Ovo"
      >
        I am a Software Developer of two years of experience
      </motion.p>
      <div className="flex flex-col sm:flex-row items-center gap-4 mt-4">
        <motion.a
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 1 }}
          href="#contact"
          className="px-10 py-3 border border-white rounded-full bg-black text-white flex items-center gap-2 dark:bg-transparent"
        >
          contact me
          <Image src={assets.right_arrow_white} alt="" className="w-4" />
        </motion.a>

        {/* ✅ Replaced motion.a with motion.div — Dialog cannot live inside an <a> tag */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.2 }}
        >
          <Dialog>
            <DialogTrigger className="px-10 py-3 border rounded-full border-gray-500 flex items-center gap-2 bg-white dark:text-black cursor-pointer">
              my resume
              {/* ✅ Image must be a sibling of the text, not wrapped separately */}
              <Image src={assets.download_icon} alt="" className="w-4" />
            </DialogTrigger>
            <DialogContent className="dark:bg-darkTheme">
              <DialogHeader>
                <DialogTitle>Want My Resume?</DialogTitle>
              </DialogHeader>
              <DialogDescription className="font-Ovo text-lg text-gray-900 dark:text-gray-300">
                Thank you for your interest in my work. Reach out to me directly
                via email or phone to get a copy of my resume and discuss
                potential opportunities.
              </DialogDescription>
              <DialogFooter>
                <DialogClose asChild>
                  <Button
                    variant="outline"
                    className="bg-black text-white dark:bg-white dark:text-black rounded-lg hover:bg-gray-800 hover:text-white dark:hover:bg-gray-300 dark:hover:text-black transition-colors duration-300"
                  >
                    <a href="#contact">Contact me</a>
                  </Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </motion.div>
      </div>
    </div>
  );
};

export default Header;
