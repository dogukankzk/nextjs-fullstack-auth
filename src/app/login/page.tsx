/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("Login here!"); 

  useEffect(() => {
    setButtonDisabled(!(user.email && user.password));
  }, [user]);

  const onLogin = async () => {
    if (loading) return;
    setLoading(true);
    setLoadingText("Logging in...");

    try {
      const response = await axios.post("/api/users/login", user);
      console.log("Login success:", response.data);

      toast.success("Connexion succes !");
      router.push("/profile");
    } catch (error: any) {
      console.error("Login error:", error);

      toast.error(error.response?.data?.error || "Error. Try later.");
    } finally {
      setLoading(false);
      setLoadingText("Login here!");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-2xl font-bold">Login</h1>
      <hr className="w-1/3 my-4" />

      <label htmlFor="email">Email</label>
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
        type="email" 
        id="email"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        placeholder="Email"
      />

      <label htmlFor="password">Password</label>
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
        type="password"
        id="password"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        placeholder="Password"
      />

      <button
        onClick={onLogin}
        className={`p-2 border rounded-lg mb-4 focus:outline-none transition ${
          buttonDisabled || loading
            ? "border-gray-400 text-gray-400 cursor-not-allowed"
            : "border-gray-300 hover:bg-gray-100 focus:border-gray-600"
        }`}
        disabled={buttonDisabled || loading}
      >
        {loading ? loadingText : buttonDisabled ? "No Login" : "Login here!"}
      </button>

      
      <Link href="/signup" className="text-white underline">
        Visit Signup page here!
      </Link>
      <Link href="/forgotpassword" className="text-white underline mt-2">
        forgot password
      </Link>
    </div>
  );
}
