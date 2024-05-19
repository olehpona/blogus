export type ThreadInfo = {
    name: string,
    description: string,
    id: string
    parentId : string| null
}

export type MessageInfo = {
    senderNick: string,
    authorNick: string,
    value: string,
    id: string,
    upVotes: number,
    parentId?: string,
    replyFor? : {
        nickName: string,
        id: string,
        value: string
    }
}

export type CommentInfo = {
    senderNick: string,
    authorNick: string,
    value: string,
    id: string,
    replyFor? : string
}

export type UserInfo = {
    id: string
    firstName: string,
    lastName: string,
    email: string,
    nickName: string,
}


