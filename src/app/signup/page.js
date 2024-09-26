"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function SignupPage() {
  const router = useRouter();

  const [user, setUser] = useState({
    email: "",
    password: "",
    username: "",
  });

  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  const onLogin = async () => {
    try {
      setLoading(true);
      await axios.post("api/users/login", user).then((response) => {
        if (response.data.success === false) {
          toast.error(response.data.message, { icon: "👏" });
        } else {
          toast.success("Login Successful");
          location.reload();
          router.push("/");
        }
      });
    } catch (error) {
      console.log("login failed", error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const onSignup = async () => {
    if (user.email === "" || user.password === "" || user.username === "") {
      toast.error("Please fill all the fields");
      return;
    }
    try {
      const t = toast.loading("Please wait...");
      setLoading(true);
      await axios.post("api/users/signup", user).then(() => {
        toast.dismiss(t);
        toast.success("User successfully created");
        onLogin();
      });
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.username.length > 0 &&
      user.password.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <>
      <div className="min-h-screen spacebg flex justify-center items-center bg-gray-900">
        <div className="w-full max-w-md bg-gray-800 p-8 rounded-3xl shadow-xl animate-fadeIn">
          <h1 className="text-3xl font-semibold text-center text-white mb-4">
            {loading ? "Processing" : "Create new Account"}
          </h1>
          <form className="mt-6 space-y-4">
            <div className="transition-transform duration-300 ease-in-out transform hover:scale-105">
              <label className="block text-sm font-semibold text-gray-300">
                Username
              </label>
              <Input
                value={user.username}
                onChange={(e) => setUser({ ...user, username: e.target.value })}
                type="text"
                placeholder="Enter your username"
                className="w-full rounded-md bg-gray-700 text-gray-200 px-4 py-2 focus:outline-none focus:ring focus:border-blue-500 transition-colors duration-300 hover:bg-gray-600"
              />
            </div>
            <div className="transition-transform duration-300 ease-in-out transform hover:scale-105">
              <label className="block text-sm font-semibold text-gray-300">
                Email
              </label>
              <Input
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                type="email"
                placeholder="Enter your email"
                className="w-full rounded-md bg-gray-700 text-gray-200 px-4 py-2 focus:outline-none focus:ring focus:border-blue-500 transition-colors duration-300 hover:bg-gray-600"
              />
            </div>
            <div className="transition-transform duration-300 ease-in-out transform hover:scale-105">
              <label className="block text-sm font-semibold text-gray-300">
                Password
              </label>
              <Input
                id="password"
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                type="password"
                placeholder="Enter your password"
                className="w-full rounded-md bg-gray-700 text-gray-200 px-4 py-2 focus:outline-none focus:ring focus:border-blue-500 transition-colors duration-300 hover:bg-gray-600"
              />
            </div>
            <p className="text-gray-300 flex items-center justify-between">
              <Link href="/forgotpassword" className="hover:underline">
                Forgot password?
              </Link>
              <label htmlFor="remember" className="font-semibold">
                <input type="checkbox" id="remember" className="mr-1" />
                Remember me
              </label>
            </p>
            <Button
              onClick={(e) => {
                e.preventDefault();
                onSignup();
              }}
              disabled={buttonDisabled}
              className="w-full py-2 rounded-md bg-blue-500 text-white font-semibold hover:bg-blue-600 transition-all duration-300"
            >
              {loading ? "Processing" : "Sign up"}
            </Button>
          </form>
          <p className="text-gray-300 mt-4">
            Already have an account?{" "}
            <Link href="/login" className="hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
