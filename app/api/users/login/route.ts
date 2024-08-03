import { connect } from "@/helper/dbconfig";
import User from "@/models/user";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(request: NextRequest) {
    try {
        const reqbody = await request.json();
        const { email, password } = reqbody; // Destructure as an object

        // Check if user exists
        const FindUser = await User.findOne({email:email});
        if (FindUser) {
            console.log("user found");
            return NextResponse.json({ message: "User already exists", success: true,});
        } else {
            console.log("user not found");
            return NextResponse.json({ message: "User not found", success:false, });
        }
    } catch (error: any) {
        return NextResponse.json({ message: error.message, status: 500 }); // Use "message" instead of "massage"
    }
}
