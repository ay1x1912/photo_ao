import prisma from "@/db";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
enum Status{
    Pending="Pending" ,
    Success="Success",
    Failed="Failed"
  }
export async function GET(request:NextRequest) {
    // const searchParams=request.nextUrl.searchParams;
    // const id=searchParams.getAll("id");
    // const skip =searchParams.get("skip") || "0";
    // const take=searchParams.get("take")  || "10"
    const session = await auth.api.getSession({
        headers: await headers()
    })
    if(!session?.user){
    return new Response(JSON.stringify({msg:"unathorized"}),{
        status:401
    })
    }
    const userId=session.user.id;
    const imagesData= await prisma.outputImage.findMany({
        where:{
            userId:userId
         }
    })
    return NextResponse.json({images:imagesData},{status:200})
    
}