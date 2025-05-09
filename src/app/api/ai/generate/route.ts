import prisma from "@/db";
import { auth } from "@/lib/auth";
import { GenerateImageFromPrompt } from "@/lib/schema";
import { FalAiModel } from "@/model/falAiModel";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
 const falModel=new FalAiModel()
export async function POST(request:NextRequest) {
    
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
        console.log(body);
        const parseBody=GenerateImageFromPrompt.safeParse(body);
        if(!parseBody.success){
          console.log(parseBody.error)
                return NextResponse.json({msg:"Incorrect Input"},{status:411})
              }
        const {modelId,num,prompt }=parseBody.data

        //db call to find the model
        const model=await prisma.model.findUnique({
          where:{
            id:modelId
          }
        })
        if(!model|| !model.tensorPath){
          return NextResponse.json({ msg:"model not foun"},{status:411})
        }
        //genreate image call to the ai model
        const request_id = await falModel.generateImages(prompt,model?.tensorPath)
     if(!request_id){
        throw new Error("Fal ai api called failed");
        
     }
     //db call to save the image
        const data=await prisma.outputImage.create({
            data:{
                modelId,
                prompt, 
                imageUrl:"",
                userId:session.user.id!,
                falAiRequest_id:request_id
            }
        })
        return NextResponse.json({imageId:data.id})
      
     
      }catch(error){
        console.log('Error occured whiel generating image from pormpt',error)
        return NextResponse.json({msg:'Internal server error'},{status:500})
      }
    
    
}