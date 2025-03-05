/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export default function SignupPage() {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
    username: "",
  });

  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [loading, setLoading] = useState(false); // Avoid double click

  useEffect(() => {
    setButtonDisabled(!(user.email && user.password && user.username));
  }, [user]);

  const onSignup = async () => {
    if (loading) return;  
    setLoading(true);

    try {
      const response = await axios.post("/api/users/signup", user);
      console.log("Signup success:", response.data);

      toast.success("Account created! Please check your email to verify.");
      router.push("/login");
    } catch (error: any) {
      console.error("Signup error:", error);

      if (error.response?.data?.error) {
        toast.error(error.response.data.error);
      } else {
        toast.error("Error. Try later.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-2xl font-bold">Signup</h1>
      <hr className="w-1/3 my-4" />

      <label htmlFor="username">Username</label>
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
        type="text"
        id="username"
        value={user.username}
        onChange={(e) => setUser({ ...user, username: e.target.value })}
        placeholder="Username"
      />

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
        onClick={onSignup}
        className={`p-2 border rounded-lg mb-4 focus:outline-none transition ${
          buttonDisabled || loading
            ? "border-gray-400 text-gray-400 cursor-not-allowed"
            : "border-gray-300 hover:bg-gray-100 focus:border-gray-600"
        }`}
        disabled={buttonDisabled || loading}
      >
        {loading ? "Signing up..." : buttonDisabled ? "No Signup" : "Signup here!"}
      </button>

      <Link href="/login" className="text-white underline">
        Visit login page here!
      </Link>
    </div>
  );
}
