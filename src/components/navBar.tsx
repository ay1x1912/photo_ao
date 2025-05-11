import React from 'react'
import { Button } from './ui/button'
import Link from 'next/link'
import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import SignOut from './auth/sign-out-button'


async function NavBar() {
    const session=await auth.api.getSession({
        headers:await headers()
    })

    return (
       <section className='border  w-full p-2 mt-4'>
        <div className="container mx-auto rounded-full p-4 bg-blue-400 flex items-center justify-between">
            <div>
                <h1>Photo Ai</h1>
            </div>
            <div className=' flex justify-center items-center gap-4'>
                
               <Link href={'/dashboard'}>
               <Button variant={'default'}>Dasboard</Button>
               </Link>
               <Link href={'/dashboard'}>
               <Button>My Purcahse</Button>
               </Link>
               <Link href={'/dashboard'}>
               <Button>Credits</Button>
               </Link>
                {session?.user && <SignOut/>}
            </div>

        </div>
       </section>
    )
}
 
export default NavBar
