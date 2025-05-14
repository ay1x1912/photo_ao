
import React from 'react'

import Generate from './prompt'
import GetModels from './get-models'


  
async function GenerateImage() { 
 
    return (
        <div className='flex flex-col bg-gray-50 py-5 md:py-8 dark:bg-transparent px-10  '>
          <GetModels/>
        <div className='mt-10'>
          <Generate/>
        </div>
        </div>
    )
}

export default GenerateImage
