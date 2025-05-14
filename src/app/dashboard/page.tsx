
import { redirect } from 'next/navigation'
import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import MyForm from '@/components/trainForm'
import React from 'react'
import Camera from '@/components/camera'
import GenerateImage from '@/components/genrate-images'
import Packs from '@/components/packs'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

 async function DasboardPage() {
     
    return (
        <div className=' flex w-scre    px-30 pt-10 '>
                <Tabs    defaultValue="Camera" className=' w-full flex justify-center items-center '>
       <TabsList  className="p-8 mt-2  flex gap-4 ">
      <TabsTrigger className='' value="Camera">Camera</TabsTrigger>
     <TabsTrigger value="Generated Images">Generated Images</TabsTrigger>
     <TabsTrigger value="Packs">Packs</TabsTrigger>
     <TabsTrigger value="Train Model">Train Model</TabsTrigger>
    </TabsList>
   <TabsContent className='w-full' value="Camera"><Camera/></TabsContent>
   <TabsContent className='w-full' value="Generated Images"><GenerateImage/></TabsContent>
   <TabsContent className='w-full' value="Packs"><Packs/></TabsContent>
   <TabsContent className='w-full' value="Train Model"><MyForm/></TabsContent>
   </Tabs>
            
        
    </div>
    )
}

export default DasboardPage
