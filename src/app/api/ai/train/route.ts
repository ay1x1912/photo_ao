import prisma from "@/db";
import { auth } from "@/lib/auth";
import { TrainModel } from "@/lib/schema";
import { FalAiModel } from "@/model/falAiModel";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request:NextRequest) {
  
    try{
     const falModel=new FalAiModel()
        //check for session
     const session=await auth.api.getSession({
        headers:await headers()
    })
    if(!session?.user){
        return new Response(JSON.stringify({msg:"unathorized"}),{
            status:401
        })}

    const body=await request.json();
    //check the body
    const parseBody= TrainModel.safeParse(body) 
      if(!parseBody.success){
        return NextResponse.json({msg:"Incorrect Input"},{status:411})
      }
    const {name,age,type,eyeColor,ethnicity,zipUrl}=parseBody.data
     //call the  model to train
    //  const request_id = await falModel.trainModel(zipUrl,name);
    const request_id="hello world"
     if(!request_id){
        throw new Error("Fal ai api called failed");
        
     }
     //db call
     const data=await prisma.model.create({
        data:{
            name,
            age,
            type,
            eyeColor,
           ethinicity:ethnicity,
            zipUrl,
            userId:session.user.id!,
            falAiRequest_id:request_id
        }
    })
    return NextResponse.json({modelId:data.id})
    }catch(error){
        console.log("Error creating model:",error)
        return NextResponse.json({msg:"Internal server error"},{status:500})
    }

}