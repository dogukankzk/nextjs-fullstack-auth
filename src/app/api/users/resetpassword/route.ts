/* eslint-disable @typescript-eslint/no-explicit-any */
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { token, newPassword } = reqBody;
        console.log("🔍 Token :", token);

        // ✅ Vérification de la présence du token et du nouveau mot de passe
        if (!token) {
            return NextResponse.json({ error: "Token missing" }, { status: 400 });
        }
        if (!newPassword || newPassword.length < 6) {
            return NextResponse.json({ error: "Password must contain at least 6 characters." }, { status: 400 });
        }

        // ✅ Vérification si l'utilisateur avec ce token existe
        const user = await User.findOne({ forgotPasswordToken: token });

        if (!user) {
            return NextResponse.json({ error: "Token invalide" }, { status: 400 });
        }

        // ✅ Vérification si le token est expiré
        if (user.forgotPasswordTokenExpiry < Date.now()) {
            return NextResponse.json({ error: "Token expired" }, { status: 400 });
        }

        // ✅ Hash du nouveau mot de passe
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        // ✅ Mise à jour du mot de passe et suppression du token en base
        await User.updateOne(
            { _id: user._id },
            { 
                $set: { password: hashedPassword }, // Nouveau mot de passe
                $unset: { forgotPasswordToken: "", forgotPasswordTokenExpiry: "" } // Suppression du token de reset
            }
        );

        console.log("✅ Password updated successfully");

        return NextResponse.json({
            success: true,
            message: "Your password has been changed successfully. Redirecting to the login page...",});

    } catch (error: any) {
        console.error("❌ Error resetting password:", error);
        return NextResponse.json({ error: error.message || "Erreur interne du serveur" }, { status: 500 });
    }
}
