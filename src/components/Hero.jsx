"use client";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { ArrowUpRight } from "lucide-react";

export function Hero() {
  const { data: session } = useSession();

  return (
    <header className="flex flex-col justify-center items-start p-10 text-left relative rounded-b-3xl">
      <div className="h-[30rem] w-full dark:bg-black bg-white dark:bg-grid-white/[0.2] bg-grid-black/[0.2] relative flex items-center justify-center font-sans">
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
        <div className="text-4xl sm:text-7xl font-bold relative z-20 bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 py-8 flex items-center justify-center flex-col">
          <motion.h1
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeInOut", delay: 0 }}
            className="text-4xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-900 to-neutral-600 dark:from-neutral-50 dark:to-neutral-400 bg-opacity-5 text-center py-2"
          >
            Empower your learning with AI
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut", delay: 0.25 }}
            className="mt-4 font-normal text-xl text-neutral-700 dark:text-neutral-400 max-w-lg text-center bg-transparent"
          >
            Let AI Craft Your Perfect Quiz - Learn Smarter, Not Harder!
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut", delay: 0.65 }}
            className="mt-6 flex flex-col sm:flex-row gap-4 justify-center"
          >
            {session ? (
              <Link href="/dashboard">
                <Button variant="default" className="w-52 h-14 text-xl rounded-full flex items-center justify-center">
                  Go to Dashboard
                </Button>
              </Link>
            ) : (
              <>
                <Link href="/signin" className="flex">
                  <Button
                    variant="default"
                    className="w-52 h-14 text-xl rounded-full flex items-center justify-center gap-2 group"
                  >
                    Sign In{" "}
                    <ArrowUpRight className="size-6 group-hover:rotate-45 transition-all duration-300" />
                  </Button>
                </Link>
                <Link href="/signup" className="flex">
                  <Button
                    variant="secondary"
                    className="w-52 h-14 text-xl rounded-full flex items-center justify-center gap-2 group"
                  >
                    Sign Up{" "}
                    <ArrowUpRight className="size-6 group-hover:rotate-45 transition-all duration-300" />
                  </Button>
                </Link>
              </>
            )}
          </motion.div>
        </div>
      </div>
    </header>
  );
}
