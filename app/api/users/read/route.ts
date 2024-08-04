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

export async function GET(request:NextRequest,res: NextResponse){
    try{
        const cars: CarDocument[] = await getCars();
         res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
      res.setHeader('Pragma', 'no-cache');
      res.setHeader('Expires', '0');
      res.setHeader('Surrogate-Control', 'no-store');
        return  res.status(200).json(
            cars
           )
       }
  


    
    catch(error:any){
           return NextResponse.json({error:error.message},{status:500});
    }

}
