
"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { signIn } from "next-auth/react";
import Link from "next/link"

export function SignInForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const result = await signIn("credentials", {
      ...formData,
      redirect: false,
    });

    if (result?.error) {
      setError(result.error);
    } else {
      router.push("/dashboard");
    }

    setLoading(false);
  };

  return (
    <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
      <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
        Welcome Back to Test.ai
      </h2>
      <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
        Sign in to your account to continue using the app.
      </p>
      <div className=" mt-4 flex flex-row gap-2  ">
            <p>
           Don't have an account?  
            </p>
            <button className="cursor-pointer  text-blue-500 underline"  >
              <Link href={'/signup'}>
              Sign up
              </Link>
              </button>
          </div>
      <form className="my-8" onSubmit={handleSubmit}>
        <div className="flex flex-col space-y-4 mb-4">
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            name="email"
            placeholder="Enter your email"
            type="email"
            value={formData.email}
            onChange={handleChange}
          />

          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            name="password"
            placeholder="********"
            type="password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>

        {error && <p className="text-red-500 m-2">{error}</p>}

        <button
          className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
          type="submit"
          disabled={loading}
        >
          {loading ? "Signing in..." : "Sign in"}
        </button>
         
      </form>
    </div>
  );
}

