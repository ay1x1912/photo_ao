
import MyForm from '@/components/trainForm'
import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Camera from '@/components/camera'
import GenerateImage from '@/components/genrate-images'
import Packs from '@/components/packs'
import { useSession } from '@/lib/auth-client'
import { redirect, useRouter } from 'next/navigation'
import { auth } from '@/lib/auth'
import { headers } from 'next/headers'

 async function DasboardPage() {
   const session= await auth.api.getSession({
    headers: await headers()
   })
     if (!session?.user) {
    redirect('/signin') // ✅ Server-side redirect
  }
    return (
        <div className=' flex w-scree border  px-30 '>
       <Tabs defaultValue="Camera" className='border w-full '>
       <TabsList  className="p-6">
      <TabsTrigger value="Camera">Camera</TabsTrigger>
     <TabsTrigger value="Generated Images">Generated Images</TabsTrigger>
     <TabsTrigger value="Packs">Packs</TabsTrigger>
     <TabsTrigger value="Train Model">Train Model</TabsTrigger>
    </TabsList>
   <TabsContent value="Camera"><Camera/></TabsContent>
   <TabsContent value="Generated Images"><GenerateImage/></TabsContent>
   <TabsContent value="Packs"><Packs/></TabsContent>
   <TabsContent value="Train Model"><MyForm/></TabsContent>
   </Tabs>
    </div>
    )
}

export default DasboardPage
