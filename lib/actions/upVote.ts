"use server"

import { upVote } from "../api/messageService"

export default async function upVoteAction(messageId: string){
    const apiResponse = await upVote(messageId);
    return apiResponse
}