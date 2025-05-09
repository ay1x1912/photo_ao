'use client';

import { BACKEND_URL } from '@/lib/config';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import CameraCard from './camerCard';
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
function Camera() {
  const [images, setImages] = useState<ImageProps[] | null>(null);

  const getImages = async ():Promise<ImageProps[] | null> => {
    try {
      const response = await axios.get(`${BACKEND_URL}/api/images/bulk`);
      return response.data.images;
    } catch (error) {
      console.error('Failed to fetch images:', error);
      return null;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await getImages();
      console.log(data);
      setImages(data);
    };

    fetchData();
  }, []);

  if(!images || !images.length){
    return(
      <div>
        <h1>No images generated yet</h1>
      </div>
    )
  }
  return(
    <div className='grid grid-cols-3'>
      {
        images.map((image)=>
          <div key={image.id}>    
        <CameraCard id={image.id} imageUrl={image.imageUrl} status={image.status}/>
        </div>
        )

      }
    </div>
  )
}

export default Camera;
