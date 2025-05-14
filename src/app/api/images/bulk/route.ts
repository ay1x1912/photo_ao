import prisma from "@/db";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
enum Status{
    Pending="Pending" ,
    Success="Success",
    Failed="Failed"
  }
export async function POST(request:NextRequest) {
    // const searchParams=request.nextUrl.searchParams;
    // const id=searchParams.getAll("id");
    // const skip =searchParams.get("skip") || "0";
    // const take=searchParams.get("take")  || "10"
 
  const body = await request.json();
    if (!body.userId) {
        return NextResponse.json({ msg: "user id not provided" }, { status: 400 });
    }
   
    const imagesData= await prisma.outputImage.findMany({
        where:{
            userId:body.userId
         },
         select:{
          prompt:true,
          imageUrl:true,
          status:true,
          model:{
            select:{name:true}
          }
         }
    })
    return NextResponse.json({images:imagesData},{status:200})
    
}