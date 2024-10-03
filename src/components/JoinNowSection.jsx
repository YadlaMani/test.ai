
"use client";
import React from "react";
import Link from "next/link";
import { Button } from "./ui/button";
import { useSession } from "next-auth/react";

export function JoinNowSection() {
  const { data: session } = useSession();

  return (
    <div className="h-[25rem] w-full rounded-md relative flex flex-col items-center justify-center antialiased">
      <div className="max-w-2xl mx-auto p-4">
        <h1 className="text-3xl md:text-5xl font-bold bg-clip-text text-center text-transparent bg-gradient-to-b from-neutral-900 to-neutral-600 dark:from-neutral-50 dark:to-neutral-400 bg-opacity-50">
          Join Test.ai
        </h1>
        <p className="mt-4 font-normal text-2xl text-center text-neutral-700 dark:text-neutral-400">
          Experience the future of learning with our AI-driven quiz platform.
          Design personalized quizzes, receive real-time feedback, and engage with a vibrant community of learners.
          Whether you're aiming to sharpen your skills, prepare for tests, or explore new knowledge, we're here to support your journey every step of the way.
        </p>
        <div className="flex justify-center items-center mt-4">
          {session ? (
            <Link href="/dashboard">
              <Button variant="secondary" className="bg-black text-white border w-40 h-14 text-xl">
                Go to Dashboard
              </Button>
            </Link>
          ) : (
            <Link href="/signup">
              <Button variant="secondary" className="bg-black text-white border w-32 h-14 text-xl">
                Sign Up Now
              </Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

