"use client"
import { useModel } from '@/store/useModel';
import Image from 'next/image'
import React, { useState } from 'react'
export interface ModelProps{
    id:string,
    name:string,
    tensorPath:string,
    thumbnailUrl:string
}
function ModelCard(props:ModelProps) {
    const setModel = useModel((state) => state.setModelId);


    const{thumbnailUrl,tensorPath,name,id}=props
    return (
        

         
           <div>
            <div  onClick={()=>setModel(id)} className="relative  w-[350px] h-[400px] cursor-pointer ">
          
          <Image
              src={thumbnailUrl}
              alt={name}
              fill
              className="object-cover rounded-t-lg"
          />
          
         </div>

           </div>
    
    )
}

export default ModelCard
