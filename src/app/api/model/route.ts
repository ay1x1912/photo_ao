import prisma from "@/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const body = await request.json();
    if (!body.userId) {
        return NextResponse.json({ msg: "user id not provided" }, { status: 400 });
    }
    
    const models=await prisma.model.findMany({
        where:{
            userId:body.userId
        }
    })
   

    return NextResponse.json({ models });
}
