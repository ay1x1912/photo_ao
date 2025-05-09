import prisma from "@/db";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request:NextRequest) {
    // const session= await auth.api.getSession({
    //     headers:await headers()
    // })
    // if(!session?.user){
    //     return NextResponse.json({msg:"unauthorized"},{status:401})
    // }
    const packs= await prisma.pack.findMany({})
    return NextResponse.json({packs:packs})
}