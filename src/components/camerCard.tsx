import Image from 'next/image'
import React from 'react'
interface ImageProps{
    id:string,
    imageUrl:string,
    status:Status
  }
  enum Status{
    Pending="Pending" ,
    Success="Success",
    Failed="Failed"
  }
import { Skeleton } from "@/components/ui/skeleton"

function CameraCard(props:ImageProps) {
    const{status,imageUrl,id}=props
    console.log(status);
    if(status==Status.Success){
        return (
            <div className='border m-4'>
                <div className='relative  w-full h-[400px] '>
                <Image src={imageUrl} alt={id} fill  className='object-cover w-full h-full' /> 
                hello   
                </div>
            </div>
        )    
    }
    return(
       
      <div className='border m-4'>
           <div className='relative   w-full h-[400px] '>
           <Skeleton className="w-full h-full animate-pulse transition-all " />
           </div>
        </div>
    )
    
}

export default CameraCard
