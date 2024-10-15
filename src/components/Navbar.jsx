"use client";

import React from "react";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { ModeToggle } from "./ui/toggle";
import { Button } from "./ui/button";

const Navbar = () => {
  const { data: session } = useSession();

  return (
    <nav className="flex justify-between items-center p-4 bg-white dark:bg-black sticky">
      <Link href="/">
        <div
          className="text-lg md:text-2xl m-4 font-bold text-center bg-clip-text text-transparent
          bg-gradient-to-b from-neutral-900 to-neutral-600 dark:from-neutral-50 dark:to-neutral-400 bg-opacity-50"
        >
          Test.ai
        </div>
      </Link>
      <div className="flex space-x-4 items-center">
        <ModeToggle />
        {session ? (
          <Button
            onClick={() => signOut( { callbackUrl: '/' } )}
            className="px-4 py-2 text-white bg-black dark:bg-white dark:text-black rounded hover:bg-red-700 transition"
          >
            Sign Out
          </Button>
        ) : (
          <></>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
