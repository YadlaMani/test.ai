"use client";
import React from "react";
import Link from "next/link";
import { Button } from "./ui/button";
import { useSession } from "next-auth/react";
import { WavyBackground } from "./ui/wavy-background";
import { LifeBuoy } from "lucide-react";

export function JoinNowSection() {
  const { data: session } = useSession();

  return (
    <div className=" w-full rounded-md relative flex flex-col items-center justify-center antialiased ">

    <div className=" absolute h-full w-[35%] bg-gradient-to-r dark:from-black from-white to-transparent z-50 left-0"></div>
    <div className=" absolute h-full w-[35%] bg-gradient-to-l dark:from-black from-white to-transparent z-50 right-0"></div>

      <WavyBackground className="max-w-2xl mx-auto ">
        <div className="max-w-2xl mx-auto p-4 ">
          <h1 className="text-3xl md:text-7xl font-bold bg-clip-text text-center text-transparent bg-gradient-to-b from-neutral-900 to-neutral-600 dark:from-neutral-50 dark:to-neutral-400 bg-opacity-50 font-sans">
            Join Test.ai
          </h1>
          <p className="mt-4 font-bold text-xl text-center text-neutral-700 dark:text-white font-sans">
            Experience the future of learning with our AI-driven quiz platform.
          </p>
          <div className="flex justify-center items-center mt-4">
            {session ? (
              <Link href="/dashboard">
                <Button
                  variant="secondary"
                  className="bg-black text-white border w-40 h-14 text-xl"
                >
                  Go to Dashboard
                </Button>
              </Link>
            ) : (
              <Link href="/signup">
                <Button
                  variant="secondary"
                  className="bg-black/80 dark:bg-white dark:text-black  text-white h-14 text-xl rounded-full px-5 flex items-center justify-center gap-2 group font-sans hover:scale-110 transition-all duration-500"
                >
                  <LifeBuoy className="group-hover:rotate-[360deg] transition-all duration-700 ease-in-out" />
                  Sign Up Now!
                </Button>
              </Link>
            )}
          </div>
        </div>
      </WavyBackground>
    </div>
  );
}
