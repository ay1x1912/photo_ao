"use client"
import React, { useState } from 'react'
import { Textarea } from "@/components/ui/textarea"
import { Label } from '@radix-ui/react-label'
import { Button } from './ui/button';
import axios from 'axios';
import { useModel } from '@/store/useModel';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
const handleOnClick=async (propmt:string,modelId:string )=>{
  
   await axios({
    method:"post",
    url:`${process.env.BBACKEND_URL}/api/ai/generate`,
    data:{
        prompt:propmt,
        modelId:modelId,
        num:1
    }

    
})


   
}
function Generate() {
    const [prompt,setPrompt]=useState("");
    const setModel=useModel((state)=>state.setModelId)
    const router=useRouter()
    const modelId=useModel((state)=>state.modelId)
    return (
        <div>
             {JSON.stringify(modelId)}
            <Label htmlFor='text'>Enter your propmt</Label>
            <Textarea id='text' onChange={(e)=>setPrompt(e.target.value)} />
            <Button onClick={ async()=> {
                  if(!prompt || !modelId){
                    toast("Prompt or Model missing")
                    return
                }
                await handleOnClick(prompt,modelId!)
                setModel('')
                setPrompt(" ")
                toast("call successful your image will be generated in while")
            }}>
             Generate Images
            </Button>
        </div>
    )
}

export default Generate
