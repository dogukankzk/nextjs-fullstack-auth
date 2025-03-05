/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST() {
    try {
        const response = NextResponse.json({
            message: "Logout successfully",
            success: true,
        });

         
        (await cookies()).set("token", "", {
            httpOnly: true,
            expires: new Date(0), // Expire immédiatement
            path: "/",
        });

        return response;
    } catch (error: any) {
        console.error("❌ Logout error:", error);
        return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
    }
}
