/* eslint-disable @typescript-eslint/no-explicit-any */

import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { sendEmail } from "@/helpers/mailer";
import { connect } from "@/dbConfig/dbConfig";

connect();


export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { email } = reqBody;
        console.log("🔍 Email reçu:", email);

        if (!email) {
            console.log("❌ Email required");
            return NextResponse.json({ error: "Email required" }, { status: 400 });
        }

        const user = await User.findOne({email});

        if (!user){
            return NextResponse.json({error:"generic message"}, {status:400})
        }

        if (user.isVerified === true){
         // Génération du token sécurisé
            const forgotPasswordToken = crypto.randomBytes(32).toString("hex");
            
            await User.updateOne(
                { _id: user._id },
                {
                    $set: {  forgotPasswordToken: forgotPasswordToken, 
                    forgotPasswordTokenExpiry: new Date(Date.now() + 3600000), 
                     },
                }
            );

            await sendEmail({email, emailType: "RESET", userId: user._id})

            return NextResponse.json({
                message: "If an account with this email exist, a reset link has been sent."
            });
            
        } else{
            return NextResponse.json({error:"generic messagee"}, {status:400})
        }

    } catch (error: any) {

        console.error("❌ Error in email verification:", error);
        return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
    }

    
}