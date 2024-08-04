import { connect } from "@/helper/dbconfig";
import Car from "@/models/car";
import { NextRequest,NextResponse } from "next/server";


    connect();
    interface CarDocument {
        carName: string;
        manufacturingYear: string;
        Price: string;
      }
      
      async function getCars(): Promise<CarDocument[]> {
        const result: CarDocument[] = await Car.find({});
        return result;
      }

export async function GET(request:NextRequest){
    try{
        const cars: CarDocument[] = await getCars();
       
        return NextResponse.json(
            cars
           )
       }
  


    
    catch(error:any){
           return NextResponse.json({error:error.message},{status:500});
    }

}
