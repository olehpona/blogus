export type ThreadInfo = {
    name: string,
    description: string,
    id: string
    parentId? : string
}

export type MessageInfo = {
    senderNick: string,
    authorNick: string,
    value: string,
    id: string,
    upVotes: number,
    downVotes: number
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


