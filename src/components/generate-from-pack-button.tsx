"use client"
import React from 'react'
import { Button } from './ui/button'
import { useModel } from '@/store/useModel'
import { usePackId} from '@/store/usePack';
import { toast } from 'sonner';
import axios from 'axios';
import { BACKEND_URL } from '@/lib/config';
import { useRouter } from 'next/navigation';



const handleOnClick= async (modelId:string,packId:string)=>{
     try{
       
    await axios({
        method:'post',
        url:`${BACKEND_URL}/api/ai/pack/generate`,
        data:{
            modelId,
            packId
        }
    })
  toast("call successful your image will be generated in while")

     }catch(error){
    toast.error(`Backend called failed with :${error} in generateFrompack`)

     }
}
function GeneratFromPack() {
  const modelId=useModel((state)=>state.modelId);
  const setModel=useModel((state)=>state.setModelId); 
  const packId=usePackId((state)=>state.packId)
  const setPackId=usePackId((state)=>state.setPackId)


const router=useRouter()
    return (
        <div className='flex justify-end'>
            <Button onClick={ async()=>{
                 if(!packId){
                 toast("Prompt is missing")
                return
                    }
                 if(!modelId){
                    toast("Select a model")
                     return
                }
                 await handleOnClick(modelId,packId)
                    setModel('')
                    setPackId(" ")
                    router.refresh()
            }}>
            Generate
        </Button>

        </div>
        
    )
}

export default GeneratFromPack
