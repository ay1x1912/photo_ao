import prisma from "@/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request:NextRequest) {
    const body=await request.json()
    const {request_id,status}=body;
    console.log("route hit")
    if(status=="OK"){
       await  prisma.outputImage.updateMany({
           where:{
               falAiRequest_id:request_id },
           data:{
               status:"Success",
               imageUrl:body.payload.images[0].url
           }
       })
       return NextResponse.json({msg:"Generated successfuly"})
    }
    if(status=="ERROR"){
    console.log("failed")
       console.log(body);
       await  prisma.model.updateMany ({
           where:{
               falAiRequest_id:request_id  },
           data:{
               status:"Failed",
               
           }
   
    })
       return NextResponse.json({error:body.paylodad},{status:400})
    
   }
       
   
    
   }