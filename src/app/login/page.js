"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

import { toast } from "react-hot-toast";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { signInAction } from "@/actions/signin"; // Import the server action

export default function LoginPage() {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  const onLogin = async () => {
    try {
      setLoading(true);
      // Call the server action instead of axios
      const response = await signInAction(user);

      if (response.success === false) {
        toast.error(response.message, { icon: "👏" });
      } else {
        toast.success("Login Successful");
        router.push("/");
      }
    } catch (error) {
      console.error("login failed", error.message);
      toast.error("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center spacebg items-center bg-gray-900 ">
      <div className="w-full max-w-md bg-gray-800 p-8 rounded-3xl shadow-lg animate-fadeIn">
        <h1 className="text-3xl font-semibold text-center text-gray-200 mb-4">
          {loading ? "Processing" : "Log In"}
        </h1>
        <h2 className="text-xl text-center text-gray-300 mb-8">
          {loading ? "Processing" : "Sign in to continue"}
        </h2>
        <form className="space-y-4">
          <div className="relative transition-transform duration-300 ease-in-out transform hover:scale-105">
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-gray-300"
            >
              Email
            </label>
            <Input
              id="email"
              type="email"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              placeholder="Enter your email"
              className="w-full bg-gray-700 text-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring focus:border-blue-500 transition-colors duration-300"
            />
          </div>
          <div className="relative transition-transform duration-300 ease-in-out transform hover:scale-105">
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-gray-300"
            >
              Password
            </label>
            <Input
              id="password"
              type="password"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              placeholder="Enter your password"
              className="w-full bg-gray-700 text-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring focus:border-blue-500 transition-colors duration-300"
            />
          </div>
          <div className="text-sm text-gray-300 flex justify-between items-center">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="remember"
                className="mr-1 focus:ring-gray-500 transition-colors duration-300"
              />
              <label htmlFor="remember">Remember me</label>
            </div>
            <span className="font-semibold hover:underline transition-colors duration-300">
              <Link href="/forgotpassword">Forgot password?</Link>
            </span>
          </div>
          <Button
            onClick={(e) => {
              e.preventDefault();
              onLogin();
            }}
            disabled={buttonDisabled}
            className={`w-full px-4 py-2 rounded-md ${
              buttonDisabled
                ? "bg-blue-500 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600"
            } transition-all duration-300`}
          >
            {loading ? "Processing" : "Login"}
          </Button>
        </form>
        <p className="text-sm text-gray-300 mt-4">
          Don't have an account?{" "}
          <span className="font-semibold hover:underline transition-colors duration-300">
            <Link href="/signup">Sign Up!</Link>
          </span>
        </p>
      </div>
    </div>
  );
}
