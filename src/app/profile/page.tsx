"use client";

import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Link from "next/link";

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function ProfilePage() {
    const router = useRouter();
    const [data, setData] = useState("nothing");
    const [loading, setLoading] = useState(false);

    const logout = async () => {
        try {
            await axios.post("/api/users/logout"); 
            toast.success("Logout successfully");
            router.push("/login");
        } catch (error: any) {
            console.log(error.message);
            toast.error(error.message);
        }
    };

    const getDetails = async () => {
        setLoading(true);
        try {
            const res = await axios.get("/api/users/me");
            console.log("User data:", res.data);
            setData(res.data.data._id);
        } catch (error: any) {
            if (error.response?.status === 401) {
                toast.error("You must be logged in!");
                router.push("/login");
            } else {
                console.error("Error fetching user data:", error);
                toast.error("Failed to fetch user data");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">

            <h1>Profile page</h1>

            <hr />

            <p className=" mb-2.5">Profile</p>

            <h2>{data === "nothing" ? ("Nothing") : ( <Link href={`/profile/${data}`} className="text-white bg-teal-700 p-2 hover:bg-teal-900 cursor-pointer"> {data}
             </Link>)}</h2>

            <hr />

            <button onClick={logout} className="bg-blue-500 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer"> Logout </button>

            <button onClick={getDetails} disabled={loading} className={`bg-purple-500 mt-4 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded cursor-pointer ${loading ? "opacity-50 cursor-not-allowed" : ""}`}>{loading ? "Loading..." : "Get User Data"} </button>

        </div>
    );
}
