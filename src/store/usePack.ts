import { create } from 'zustand'
interface PackState {
    packId: string | null;
    setPackId: (id: string) => void;
  }
export const usePackId=create<PackState>((set)=>({
packId:null,
setPackId:(id)=>set({packId:id})
    
}))