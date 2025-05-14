"use client"
import { cn } from '@/lib/utils';
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
    const setModel= useModel((state) => state.setModelId);
    const modelId= useModel((state) => state.modelId);
    const [selected,setSelected]=useState(false);


    const{thumbnailUrl,tensorPath,name,id}=props
    return (
           
        <div  onClick={()=>{
            setModel(id) 
            setSelected(!selected)
            }} className="relative  w-[350px] h-[400px] cursor-pointer ">
         <Image className={cn("h-96 w-full rounded-md object-cover object-top  transition-all duration-500 group-hover:h-[22.5rem] group-hover:rounded-xl" ,{
            "border-3 border-blue-400":selected
         })} src={thumbnailUrl} alt="team member" width="826" height="1239" /> 
         </div>
    
    )
}

export default ModelCard
