"use client"
import React, { useState } from 'react'
import { Textarea } from "@/components/ui/textarea"
import { Label } from '@radix-ui/react-label'
import { Button } from './ui/button';
import axios from 'axios';
import { useModel } from '@/store/useModel';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { BACKEND_URL } from '@/lib/config';
const handleOnClick=async (propmt:string,modelId:string )=>{
  try{
   await axios({
    method:"post",
    url:`${BACKEND_URL}/api/ai/generate`,
    data:{
        prompt:propmt,
        modelId:modelId,
        num:1
    }

    
})               
toast("call successful your image will be generated in while")

}catch(error){
    toast.error(`Backend called failed with :${error}`)
}

   
}
function Generate() {
    const [prompt,setPrompt]=useState("");
    const setModel=useModel((state)=>state.setModelId)
    const router=useRouter()
    const modelId=useModel((state)=>state.modelId)
    return (
        <div className='flex flex-col gap-4'>
            <Label htmlFor='text'>Enter your propmt</Label>
            <Textarea id='text' onChange={(e)=>setPrompt(e.target.value)} />
             <div className='flex justify-end items-center'>
            
            <Button 
            className='w-40 h-15 rounded-lg p-4 '
            onClick={ async()=> {
                  if(!prompt){
                    toast("Prompt is missing")
                    return
                }
                if(!modelId){
                    toast("Select a model")
                    return
                }
                await handleOnClick(prompt,modelId!)
                setModel('')
                setPrompt(" ")
                router.refresh()
            }}>
             Generate Images
            </Button>
            </div>
        </div>
    )
}

export default Generate
