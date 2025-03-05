/* eslint-disable @typescript-eslint/no-explicit-any */
import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { sendEmail } from "@/helpers/mailer";

connect(); 

export async function POST(request: NextRequest) {
    try {
        console.log("⏳ Parsing request body...");
        const reqBody = await request.json();
        console.log("✅ Received body:", reqBody);

        const { username, password, email } = reqBody;

        console.log("🔍 Checking if user exists...");
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            console.log("❌ User already exists");
            return NextResponse.json({ error: "User already exists" }, { status: 400 });
        }

        console.log("🔐 Hashing password...");
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        console.log("✅ Password hashed");

        console.log("📁 Saving user in database...");
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
        });

        const savedUser = await newUser.save();
        console.log("✅ User saved:", savedUser);

        // ✅ Correction : Envoi d'email bien configuré
        await sendEmail({ email, emailType: "VERIFY", userId: savedUser._id });

        return NextResponse.json({ message: "User saved successfully", success: true });
    } catch (error: any) {
        console.error("❌ Error:", error);
        return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
    }
}
