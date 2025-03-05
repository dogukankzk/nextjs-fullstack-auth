/* eslint-disable @typescript-eslint/no-explicit-any */
import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers"; 

connect();

export async function POST(request: NextRequest) {
    try {
        console.log("⏳ Parsing request body...");
        const reqBody = await request.json(); 
        const { email, password } = reqBody;
        console.log("✅ Received body:", reqBody);

        // ✅ Vérification si l'utilisateur existe
        const user = await User.findOne({ email });
        if (!user) {
            console.log("❌ User does not exist");
            return NextResponse.json({ error: "User does not exist" }, { status: 400 });
        }

        // ✅ Vérification du mot de passe
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            console.log("❌ Wrong password");
            return NextResponse.json({ error: "Wrong password" }, { status: 400 });
        }

        // ✅ Création du token
        const tokenData = {
            id: user._id,
            email: user.email,
        };

        const token = jwt.sign(tokenData, process.env.TOKEN_SECRET!, { expiresIn: "1d" });

        // ✅ Ajout du token dans les cookies (nouvelle méthode pour Next.js)
        (await cookies()).set("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 24 * 60 * 60,
        });

        console.log("✅ Login successful!");
        return NextResponse.json({
            message: "Login successful",
            success: true,
        });

    } catch (error: any) {
        console.error("❌ Login error:", error);
        return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
    }
}
