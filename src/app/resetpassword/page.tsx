/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter, useSearchParams } from "next/navigation";

export default function ResetPasswordPage() {
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const searchParams = useSearchParams();
    const token = searchParams.get("token"); // 
    const router = useRouter();

    useEffect(() => {
        if (!token) {
            toast.error("Token is missing, redirecting to login...");
            router.push("/login"); // 
        }
    }, [token]);

    const handleResetPassword = async () => {
        if (!password || password.length < 6) {
            toast.error("Password must be at least 6 characters long.");
            return;
        }
    
        console.log("🔍 Token:", token); 
    
        if (!token) {
            toast.error("No token found in URL.");
            return;
        }
    
        setLoading(true);
        console.log("🔄 Sending reset password request...");
    
        try {
            const response = await axios.post("/api/users/resetpassword", { token, newPassword: password });
            console.log("✅ Password reset successful:", response.data);
            toast.success(response.data.message);
            
            setTimeout(() => {
                console.log("🔄 Redirecting to login page...");
                router.push("/login");
            }, 3000);
        } catch (error: any) {
            console.error("❌ Error resetting password:", error.response?.data?.error || "Unknown error");
            toast.error(error.response?.data?.error || "Error resetting password.");
        } finally {
            setLoading(false);
        }
    };
    

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="text-2xl font-bold mb-4">Reset Password</h1>

            <label htmlFor="password">New Password</label>
            <input
                className="p-2 mt-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
                type="password"
                id="password"
                placeholder="Enter new password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            <button
                onClick={handleResetPassword}
                disabled={loading}
                className={`p-2 border border-gray-300 rounded-lg text-white 
                            ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-700"}`}
            >
                {loading ? "Updating password..." : "Reset Password"}
            </button>
        </div>
    );
}
