import { connect } from "@/helper/dbconfig";
import Car from "@/models/car";
import { NextRequest,NextResponse } from "next/server";
import mongoose from "mongoose";

    connect();

export async function POST(request:NextRequest){

    
    try{
        const reqbody=await request.json();
       const {carName,Year,Price}=reqbody;
       const NewCar = new Car({
        carName, 
        Year, 
        Price
    });
      
       const temp= await Car.findOne({carName:carName});//cheack if car is already exist
       if(temp){
         await Car.deleteOne({_id:NewCar._id});
       console.log("deleted");
        return   NextResponse.json({message:"cardeleted"},{status:200});

       }
       console.log("cannotdelete");
       return NextResponse.json({message:"carNot exist"});
     
       


    }
    catch(error:any){
           return NextResponse.json({error:error.message},{status:500});
    }

}
