/* eslint-disable @typescript-eslint/no-explicit-any */
import { getDataFromToken } from "@/helpers/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import { connect } from "@/dbConfig/dbConfig";

connect();

export async function GET(request: NextRequest) {
    try {
        console.log("🔑 Extracting user ID from token...");
        const userId = await getDataFromToken(request);
        
        if (!userId) {
            console.log("❌ Unauthorized access - No token found");
            return NextResponse.json({ error: "Unauthorized - No token found" }, { status: 401 });
        }

        console.log("🔍 Searching for user:", userId);
        const user = await User.findById(userId).select("-password");

        if (!user) {
            console.log("❌ User not found");
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        console.log("✅ User found:", user);
        return NextResponse.json({
            message: "User found!",
            data: user
        });

    } catch (error: any) {
        console.error("❌ Error in /api/users/me:", error);
        return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
    }
}
