"use server";

import { getComment, getMessages } from "../api/messageService";
import { MessageInfo } from "../types";

export async function getMessageAction(
  items: MessageInfo[],
  page: number,
  threadId: string
) {
  const apiResponse = await getMessages(page, threadId);
  if (apiResponse.status) {
    const mapData: MessageInfo[] = apiResponse.data
      ? apiResponse.data.map((el) => ({
          senderNick: el.sender.nickName,
          authorNick: el.author.nickName,
          value: el.value,
          id: el.id,
          upVotes: el.upVotes,
        }))
      : [];
    if (mapData.length > 0) {
      return {
        status: true,
        data: [...items, ...mapData],
      };
    } else {
      return { status: false, message: "That's all" };
    }
  } else {
    return { status: false, message: "Some things went wrong :(" };
  }
}

export async function getCommentAction(
  items: MessageInfo[],
  page: number,
  messageId: string
) {
  const apiResponse = await getComment(page, messageId);
  if (apiResponse.status) {
    const mapData: MessageInfo[] = apiResponse.data
      ? apiResponse.data.map((el) => ({
          senderNick: el.sender.nickName,
          authorNick: el.author.nickName,
          value: el.value,
          id: el.id,
          upVotes: el.upVotes,
          parentId: el.parentId ? el.parentId : undefined,
          replyFor: el.replyFor
            ? {
                nickName: el.replyFor.sender.nickName,
                id: el.replyFor.id,
                value: el.replyFor.value.slice(0, 30).replace(/\W*\s*$/, "..."),
              }
            : undefined,
        }))
      : [];
    if (mapData.length > 0) {
      return {
        status: true,
        data: [...items, ...mapData],
      };
    } else {
      return { status: false, message: "That's all" };
    }
  } else {
    return { status: false, message: "Some things went wrong :(" };
  }
}
