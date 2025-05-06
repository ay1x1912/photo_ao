import prisma from "@/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request:NextRequest) {
    const body=await request.json()
    const {status ,request_id ,tensorPath}=body
console.log(body);
    if(status=="OK"){
        await  prisma.model.updateMany({
            where:{
                falAiRequest_id:request_id },
            data:{
                status:"Success",
                tensorPath:tensorPath
    
            }
        })
        return NextResponse.json({msg:"Trained successfuly"})
     }
     if(status=="ERROR"){
        await  prisma.model.updateMany ({
            where:{
                falAiRequest_id:request_id  },
            data:{ 
                status:"Failed",
                
            }
    
     })
     return NextResponse.json({error:body.paylodad.detail.msg})
    
}
}