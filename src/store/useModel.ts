import { create } from 'zustand'
interface ModelState {
    modelId: string | null;
    setModelId: (id: string) => void;
  }
export const useModel=create<ModelState>((set)=>({
modelId:null,
setModelId:(id)=>set({modelId:id})
    
}))