"use client";

import React from "react";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";

const Navbar = () => {
  const { data: session } = useSession();

  return (
    <nav className="flex justify-between items-center p-4 bg-white shadow-md sticky">
      <Link href="/">
      <div className="text-xl font-bold">Test.ai</div>
      </Link>
      <div className="flex space-x-4">
        {!session ? (
          <>
            <Link href="/signin">
              <button className="px-4 py-2 text-white bg-black rounded hover:bg-white hover:text-black hover:border-black border">
                Sign In
              </button>
            </Link>
            <Link href="/signup">
              <button className="px-4 py-2 text-white bg-gray-700 rounded hover:bg-white hover:text-black hover:border-black border">
                Sign Up
              </button>
            </Link>
          </>
        ) : (
          <button
            onClick={() => signOut()}
            className="px-4 py-2 text-white bg-black rounded hover:bg-red-700"
          >
            Sign Out
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
