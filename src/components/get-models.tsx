import { auth } from '@/lib/auth'
import { BACKEND_URL } from '@/lib/config'
import axios from 'axios'
import { headers } from 'next/headers'
import React from 'react'
import { toast } from 'sonner'
import ModelCard from './model-card'


export interface ModelInterface{
    name :string,
    id:string,
    tensorPath:string,
    thumbnailUrl:string
}
const getModels = async (userId: string): Promise<ModelInterface[]> => {
    try {
      const res=await axios({
        method:"post",
        url:`${BACKEND_URL}/api/model`,
        data:{
          userId
        }
      })
      return res.data.models
    } catch (error) {
      toast.error("Failed to get models")
      return []
    }
  }
async function GetModels() {
        const session = await auth.api.getSession({
            headers: await headers()
        })
        if(!session) {
            return <div>Not authenticated</div>
        }
        const {id}=session.user;
        const models=await getModels(id);
    return (
       
          <div>
                <h1 className='text-3xl text-center  '>Select a Model</h1>
                <div className='mt-4'>

          {models.map((model)=>(
           <div className='flex gap-4' key={model.id}>
            <ModelCard id={model.id} name='string' thumbnailUrl={model.thumbnailUrl} tensorPath={model.tensorPath}/>
           </div>
            
          ))}
          </div>
        </div>
    )
}

export default GetModels
