import { connect } from "@/helper/dbconfig";
import Car from "@/models/car";
import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { carName, Year, Price } = reqBody;
    const newCar = new Car({
      carName,
      Year,
      Price
    });

    // Check if car already exists
    const existingCar = await Car.findOne({ carName: carName });
    if (existingCar) {
      // Delete the car if it exists
      await Car.deleteOne({ _id: existingCar._id });
      console.log("Car deleted");
      return NextResponse.json({ message: "Car deleted" }, { status: 200 });
    }

    console.log("Car does not exist, cannot delete");
    return NextResponse.json({ message: "Car does not exist" }, { status: 404 });

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
