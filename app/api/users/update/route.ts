import { connect } from "@/helper/dbconfig";
import Car from "@/models/car";
import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";

    connect();


export async function POST(request: NextRequest) {
    try {
        const reqbody = await request.json();
        const { carName, Year, Price, NewcarName, Newyear, Newprice } = reqbody;

        const NewCar = {
            carName: NewcarName,
            Year: Newyear,
            Price: Newprice
        };
        
        const temp = await Car.findOne({carName: carName }); // Check if car already exists

        if (temp) {
            await temp.updateOne(NewCar);
            console.log("successful");

            return NextResponse.json({ message: "Successfully updated" }, { status: 200 });
        } else {
            const savedCar = new Car(NewCar);
            await savedCar.save();
            return NextResponse.json({
                message: "Successfully registered",
                success: true,
                savedCar
            });
        }
    } catch (error: any) {
        console.log(error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
