/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter()

    const handleForgotPassword = async () => {
        if (!email) {
            toast.error("Please enter a email");
            return;
        }

        setLoading(true); 

        try {
            const response = await axios.post("/api/users/forgotpassword", { email });
            toast.success(response.data.message);
            router.push("/login")

        } catch (error: any) {
            toast.error(error.response?.data?.error || "Error");
        } finally {
            setLoading(false); // Réactive le bouton après la requête
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="text-2xl font-bold mb-4">Forgot password</h1>

            <label htmlFor="email">Email</label>
            <input
                className="p-2 mt-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
                type="email"
                id="email"
                placeholder="Email"
                value={email} 
                onChange={(e) => setEmail(e.target.value)}
            />

            <button 
                onClick={handleForgotPassword} 
                disabled={loading} 
                className={`p-2 border border-gray-300 rounded-lg text-white 
                            ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-700"}`}
            >
                {loading ? "Sending..." : "Reset password"}
            </button>
        </div>
    );
}
