import { connect } from "@/helper/dbconfig";
import Car from "@/models/car";

import { NextRequest, NextResponse } from "next/server";

    connect();


export async function POST(request:NextRequest) {
    try {
        const reqbody = await request.json();
        const { carName, Year, Price } = reqbody; // Updated to match your schema
        const NewCar = new Car({
            carName, // Ensure case matches your schema
            Year, // Updated to match your schema
            Price
        });
         console.log(NewCar);
        const temp = await Car.findOne({ CarName:carName }); // Match the schema definition
        if (temp) {
            console.log("carexist");
            return NextResponse.json({ message: "car already exists" }, { status: 400 });
        }

        const savedCar = await NewCar.save();
        return NextResponse.json({
            message: "successfully registered",
            success: true,
            savedCar
        });

    } catch (error:any) {
        console.log(error);
        return NextResponse.json({ error: error.message }, { status: 500 }); // Use "message" instead of "massage"
    }
}
