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
    headers:await headers()
  })

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  
   
    const imagesData= await prisma.outputImage.findMany({
        where:{
            userId:session.user.id
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