"use client"
import React from 'react'
import { Button } from '../ui/button'
import { signOut } from '@/lib/auth-client'
import { useRouter } from 'next/navigation'

const SignOut = () => {
    const router = useRouter()
  return (
    <Button
     variant="outline"
     size="sm"
    onClick={async() => {await signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/signin")
        }
      }
    })}}
    >Logout</Button>
  )
}

export default SignOut