import { connect } from "@/helper/dbconfig";
import User from "@/models/user";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

connect();

export async function POST(request: NextRequest) {
    try {
        const reqbody = await request.json();
        const { username, password, email } = reqbody;
        
        // Check if user already exists
        const user = await User.findOne({ email });
        if (user) {
            return NextResponse.json({ error: "User already exists" }, { status: 400 });
        }

        // Hash password
        const salt = await bcryptjs.genSalt(10);
        const hashPassword = await bcryptjs.hash(password, salt);
        
        const newUser = new User({
            username,
            email,
            password: hashPassword
        });
        
        const savedUser = await newUser.save();
        console.log(savedUser);

        return NextResponse.json({
            message: "Successfully registered",
            success: true,
            savedUser
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
