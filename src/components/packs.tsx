
import React from 'react'
 import valentineThumbNail from "../../public/valentineThumbNail.png"
 import airplaneThumNail from "../../public/airplaneThumbNail.png"
import { AuthorCard } from './ui/content-card'
import GetModels from './get-models'
import GeneratFromPack from './generate-from-pack-button'

const packs=[
  {
    id:"1",
    name :'Valentine Pack',
    description:'Propmts for a person on valentine',
    thumbnailUrl:`${valentineThumbNail.src}`
  },
  {
    id:"2",
    name :'Airplane Pack',
    description:'Propmts for a person on an airplane',
    thumbnailUrl:`${airplaneThumNail.src}`
  }
]
export  interface PackInterface{
    id :string,
    name :string,
    description:string,
    thumbnailUrl:string
  }
async function Packs() {
  

    return (
      <div >
        <h1 className='text-center text-2xl font-semibold'>Select a pack</h1>
     
        <div 
        className=' flex gap-x-4 p-4'
     
        >
          {
            packs.map((pack)=>(
              <AuthorCard 
              id={pack.id}
              key={pack.id}
              backgroundImage={pack.thumbnailUrl}
              content={{
                title:pack.name,
                description:pack.description
              }}

              />
            ))
          }
           </div>
        <div>
          <GetModels/>
        </div>
        <div>
        <GeneratFromPack/>
        </div>

         </div>
    )
}

export default Packs
