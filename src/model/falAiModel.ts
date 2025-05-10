import { BACKEND_URL } from "@/lib/config";
import { baseModel } from "./baseModel";
import { fal } from "@fal-ai/client";

fal.config({
    credentials: process.env.FAL_API_KEY
  });
  
export class FalAiModel extends baseModel{
    constructor(){
        super()
    }
    
   async generateImages(prompt: string, tensorPath: string): Promise<string | void> {
    try{
    const { request_id ,response_url } = await fal.queue.submit("fal-ai/flux-lora", {
      input: {
        prompt,
        loras:[{path:tensorPath,scale:1}]
      },
      webhookUrl: `${BACKEND_URL}/api/webhook/generate`,
    });
    return request_id
}
    catch(error){
        console.log('Error during generating image',error)
    }
    }
    async trainModel(zipUrl: string, triggerWord: string): Promise<string | void> {
         try{
            const { request_id ,response_url } = await fal.queue.submit("fal-ai/flux-lora-fast-training", {
                input: {
                  images_data_url: zipUrl,
                  trigger_word:triggerWord
                },
                webhookUrl: `${BACKEND_URL}/api/webhook/train`,
              });
              return request_id
         }
         catch(error){
            console.log('Error during training',error)
         }
    }
}