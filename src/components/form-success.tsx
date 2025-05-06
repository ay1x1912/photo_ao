import React from 'react'
import { GoCheckCircle } from "react-icons/go"; 

type FormSuccessProps = {
    message?: string
}

const FormSuccess= ({message}: FormSuccessProps) => {
    if (!message) return null
  return (
    <div className="bg-green-500 p-3 rounded-md flex items-center gap-x-2 text-sm text-green-400">
       <GoCheckCircle className='size-4' />
        {message}
    </div>
  )
}

export default FormSuccess