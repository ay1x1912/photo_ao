


import axios from 'axios';
import { BACKEND_URL } from '@/lib/config';
import { auth } from '@/lib/auth';
import { cookies, headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { Skeleton } from './ui/skeleton';
import Image from 'next/image';
import { toast } from 'sonner';

interface ImageProps{
  model:{
    name:string
  }
  prompt:string,
  imageUrl:string,
  status:Status
}
enum Status{
  Pending="Pending" ,
  Success="Success",
  Failed="Failed"
}
 

  const getImages = async (cookieHeader:string):Promise<ImageProps[] | null> => {
    try {
      const response = await axios({
        method:"get",
        url:`${BACKEND_URL}/api/images/bulk`,
         headers: {
      Cookie: cookieHeader,
    },
      })
      return response.data.images;
    } catch (error) {
      console.error('Failed to fetch images:', error);
      toast(
        <div >  
          <h1>Error</h1>
          <p> Failed to Fetch images</p>
        </div>
        )
      return null;
    }
  };
async function Camera() {
  const cookieHeader = cookies().toString();
 const images= await getImages(cookieHeader)

 

  if(!images || !images.length){
    return(
      <div>
        <h1>No images generated yet</h1>
      </div>
    )
  }
  return(
      <section className="bg-gray-50 py-10 md:py-20 dark:bg-transparent">
            <div className="mx-auto max-w-5xl px-6">
                <div className="mt-12 ">
                    <div className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
                        {images.map((member, index) => (
                          <div key={index} className="group overflow-hidden">
                                {
                                  member.status=="Success" ? <Image className="h-96 w-full rounded-md object-cover object-top  transition-all duration-500 group-hover:h-[22.5rem] group-hover:rounded-xl" src={member.imageUrl} alt="team member" width="826" height="1239" /> :
                                  <Skeleton className="h-96 w-full rounded-md object-cover object-top  transition-all duration-500 group-hover:h-[22.5rem] group-hover:rounded-xl"  />
                                }
                                <div className="px-2 pt-2 sm:pb-0 sm:pt-4">
                                    <div className="flex justify-between">
                                        <h3 className="text-title text-base font-medium transition-all duration-500 group-hover:tracking-wider">{member.model.name}</h3>
                                        <span className="text-xs">_0{index + 1}</span>
                                    </div>
                                    <div className="mt-1 flex items-center justify-between">
                                        <span className="text-muted-foreground inline-block translate-y-6 text-sm opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100 uppercase">{member.prompt}</span>
                              
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
  )
}

export default Camera;
