import {create} from "zustand"
import { MessageInfo } from "../types"

interface commentStore  {
    comment: MessageInfo | null,
    setComment: (message: MessageInfo| null) => void
}

export const useCommentStore = create<commentStore>((set) => ({
    comment: null,
    setComment: (message: MessageInfo| null) => set({comment: message})
}))