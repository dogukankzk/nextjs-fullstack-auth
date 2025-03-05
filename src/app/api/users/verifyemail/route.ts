/* eslint-disable @typescript-eslint/no-explicit-any */
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { token } = reqBody;
        console.log("🔍 Token reçu:", token);

        const user = await User.findOne({
            verifyToken: token,
            verifyTokenExpiry: { $gt: Date.now() },
        });

        if (!user) {
            console.log("❌ Invalid token or token expired");
            return NextResponse.json({ error: "Invalid or expired token" }, { status: 400 });
        }

        console.log("✅ User trouvé:", user.email);

        // ✅ Mise à jour de l'utilisateur en supprimant le token et en validant le compte
        await User.updateOne(
            { _id: user._id },
            {
                $set: { isVerified: true },
                $unset: { verifyToken: "", verifyTokenExpiry: "" },
            }
        );

        return NextResponse.json({
            message: "Email verified successfully",
            success: true,
        });
    } catch (error: any) {
        console.error("❌ Error in email verification:", error);
        return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
    }
}
