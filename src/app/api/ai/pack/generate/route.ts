import prisma from "@/db";
import { auth } from "@/lib/auth";
import { GenerateImageFromPack } from "@/lib/schema";
import { FalAiModel } from "@/model/falAiModel";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request:NextRequest) {
     const falModel=new FalAiModel()
    try{
           //authorization
             const session=await auth.api.getSession({
                headers:await headers()
             })
             if(!session?.user){
                return new Response(JSON.stringify({msg:"unathorized"}),{
                    status:401
                })}
          //check for body
        const body= await request.json()
        const parseBody=GenerateImageFromPack.safeParse(body);
        if(!parseBody.success){
        return NextResponse.json({msg:"Incorrect Input"},{status:411})
            
        }
        const {modelId,packId}=parseBody.data
        //db call to get all the prompts
        const prompts=await prisma.packPrompts.findMany({
            where:{
                packId
            }
        })
        //db call to get the model id 
        const model=await prisma.model.findUnique({
          where:{
            id:modelId
          }
        })
        if(!model || !model.tensorPath ){
          return NextResponse.json({ msg:"model not foun"},{status:411})
        }
        //call to the ai model
        const imageData = await Promise.all(
          prompts.map(async (prompt) => {
            const request_id = await falModel.generateImages(prompt.prompt, model.tensorPath!);
            if (!request_id) {
              throw new Error('Fal AI API call failed');
            }
    
            return {
              modelId,
              prompt: prompt.prompt,
              imageUrl: '',
              userId:session.user.id,
              falAiRequest_id: request_id
            };
          })
        );
        //call to the database to store image data in db 
        const images= await prisma.outputImage.createManyAndReturn({
          data:imageData
        })
        return NextResponse.json({images:images.map((image)=>image.id)})


      }catch(error){
        console.log('Error while genrating pack images',error)
        return NextResponse.json({msg:'Internal server error'},{status:500})
      }
    
}