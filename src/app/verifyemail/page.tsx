"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function VerifyEmailPage() {
    const [token, setToken] = useState("");
    const [verified, setVerified] = useState(false);
    const [error, setError] = useState(false);

    // ✅ Get the token secure
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const urlToken = params.get("token");
        setToken(urlToken || "");
    }, []);

    // ✅ Email verification as soon as the token is avaible
    useEffect(() => {
        if (token.length > 0) {
            verifyUserMail();
        }
    }, [token]);

    const verifyUserMail = async () => {
        try {
            console.log("🔍 Sending token to backend:", token);
            await axios.post("/api/users/verifyemail", { token });
            setVerified(true);
            toast.success("Email successfully verified.");
        } catch (error: any) {
            setError(true);
            console.error("❌ Verification error:", error.response?.data || "Unknown error");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center py-2 min-h-screen">
            <h1 className="text-4xl">Verify Email</h1>
            <h2 className="p-2 bg-orange-500 text-black">{token ? `Token: ${token}` : "No token found"} </h2>

            {verified && (
                <div className="bg-white p-2 text-black mt-4 rounded">

                    <Link href="/login">Go to Login</Link>
                </div>
            )}

            {error && (
                <div className="bg-red-500 p-4 text-white mt-4 rounded">
                    <h2 className="text-xl">❌ Error verifying email</h2>
                </div>
            )}
        </div>
    );
}
