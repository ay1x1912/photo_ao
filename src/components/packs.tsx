
import axios from 'axios'
import React from 'react'
import PackCard from './pack-card'
import { cookies, headers } from 'next/headers'
import { BACKEND_URL } from '@/lib/config'
const getPacks =async() :Promise<PackInterface[]>=>{
  console.log(BACKEND_URL)
  try{
    const response= await axios({
      method:"get",
      url:`${BACKEND_URL}/api/pack/bulk`,
      
    })
  return response.data.packs 

  }catch(error){
    console.error("Failed to fetch packs:", error)
    return []
  }
//  
}
export  interface PackInterface{
    id :string,
    name :string,
    description:string,
    thumbnailUrl:string
  }
async function Packs() {
    const packs =await getPacks()
    return (
        <div className=' flex gap-x-4 p-4'>
            
          {packs.map((pack)=><PackCard key={pack.id} name={pack.name} thumbnailUrl={pack.thumbnailUrl} description={pack.description}/>)}
        </div>
    )
}

export default Packs
