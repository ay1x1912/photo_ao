import { auth } from '@/lib/auth'
import axios from 'axios'
import { headers } from 'next/headers'
import Image from 'next/image'
import React from 'react'
import ModelCard from './model-card'
import Generate from './generate'
import { BACKEND_URL } from '@/lib/config'


export interface ModelInterface{
    name :string,
    id:string,
    tensorPath:string,
    thumbnailUrl:string
}
const getModels = async (userId: string): Promise<ModelInterface[]> => {
    try {
      const res = await axios.post(`${BACKEND_URL}/api/model`, { userId })
      return res.data.models ?? []
    } catch (error) {
      console.error("Failed to fetch models:", error)
      return []
    }
  }
  
async function GenerateImage() { 
    const session = await auth.api.getSession({
        headers: await headers()
    })
    if(!session) {
        return <div>Not authenticated</div>
    }
    const {id}=session.user;
    const models=await getModels(id)
    return (
        <div className='flex flex-col '>
            <div>
                <h1 className='text-3xl font-bold'>Select a Model</h1>

        
          {models.map((model)=>(
           <div className='flex gap-4' key={model.id}>
            <ModelCard id={model.id} name='string' thumbnailUrl={model.thumbnailUrl} tensorPath={model.tensorPath}/>
           </div>
            
          ))}
        </div>
        <div>

        </div >
        <div className='mt-10'>
          <Generate/>
          </div>
        </div>
    )
}

export default GenerateImage
