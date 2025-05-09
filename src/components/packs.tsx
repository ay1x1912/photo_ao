import { BACKEND_URL } from '@/lib/config'
import axios from 'axios'
import React from 'react'
import PackCard from './pack-card'
import { cookies, headers } from 'next/headers'
const getPacks =async() :Promise<PackInterface[]>=>{
  const response= await axios({
    method:"get",
    url:`${BACKEND_URL}/api/pack/bulk`,
    
  })
//   console.log(response.data.packs)
  return response.data.packs ?? []
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
