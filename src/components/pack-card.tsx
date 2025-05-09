import React from 'react'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
  } from "@/components/ui/carousel"
  
import Image from 'next/image'
import { Button } from './ui/button'
  
 export  interface PackCardProps{
    name :string,
    description:string,
    thumbnailUrl:string
  }
  function PackCard(props: PackCardProps) {
    const { name, description, thumbnailUrl } = props;

    return (
        <div className="rounded-lg border shadow-md w-[350px] flex flex-col overflow-hidden">
            <div className="relative w-full h-[400px]">
                <Image
                    src={thumbnailUrl}
                    alt={name}
                    fill
                    className="object-cover rounded-t-lg"
                />
            </div>

            <div className="flex flex-col h-1/3 justify-between gap-4 px-4 py-6 text-center">
                <div>
                    <h1 className="text-2xl font-semibold uppercase">{name}</h1>
                    <p className="text-base text-gray-700 mt-2">{description}</p>
                </div>

                <div>
                <Button className="w-3/4 mx-auto">Generate</Button>
                </div>
            </div>
        </div>
    );
}


export default PackCard
