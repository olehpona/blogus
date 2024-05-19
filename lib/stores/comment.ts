import {create} from "zustand"
import { MessageInfo } from "../types"

interface commentStore  {
    comment: MessageInfo | null,
    type: "comment" | "reply"| null,
    set: (message: MessageInfo| null, type: "comment" | "reply"| null) => void,
    clear: () => void
}

export const useCommentStore = create<commentStore>((set) => ({
    comment: null,
    type: null,
    set: (message: MessageInfo| null, type: "comment" | "reply"| null) => set({comment: message, type: type}),
    clear: ()=> set({comment: null, type: null})
}))