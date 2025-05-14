import prisma from "@/db";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const session = await auth.api.getSession({
    headers:await headers()
  })

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
    const models=await prisma.model.findMany({
        where:{
            userId:session.user.id
        }
    })
  

    return NextResponse.json({ models });
}
