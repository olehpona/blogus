import prisma from "../db";
import { MessageInfo } from "../types";

export async function createMessage(
  senderId: string,
  threadId: string,
  value: string,
) {
  try {
    const message = await prisma.message.create({
      data: {
        sender: {
          connect: {
            id: senderId,
          },
        },
        author: {
          connect: {
            id: senderId,
          },
        },
        thread: {
          connect: {
            id: threadId,
          },
        },
        value: value,
      },
    });
    return { status: true, message: "Success" };
  } catch (e) {
    return { status: false, message: (e as Error).message };
  }
}

export async function upVote(messageId: string) {
  try {
    const message = await prisma.message.findUnique({
      where: {
        id: messageId,
      },
    });
    if (message) {
      const updated = await prisma.message.update({
        where: {
          id: messageId,
        },
        data: {
          upVotes: (message.upVotes as number) + 1,
        },
      });
      return { status: true, message: "success" };
    }
    return { status: false, message: "not found" };
  } catch (e) {
    return { status: false, message: (e as Error).message };
  }
}

export async function repost(
  messageId: string,
  senderId: string,
  threadId: string
) {
  try {
    const message = await prisma.message.findUnique({
      where: {
        id: messageId,
      },
    });
    if (message) {
      const repostedMessage = await prisma.message.create({
        data: {
          sender: {
            connect: {
              id: senderId,
            },
          },
          author: {
            connect: {
              id: message.authorId,
            },
          },
          thread: {
            connect: {
              id: threadId,
            },
          },
          value: message.value,
        },
      });
      return { status: true, message: "Success" };
    }
    return { status: false, message: "Not found" };
  } catch (e) {
    return { status: false, message: (e as Error).message };
  }
}

export async function comment(
  messageId: string,
  senderId: string,
  value: string
) {
  try {
    const comment = await prisma.message.create({
      data: {
        parent: {
          connect: {
            id: messageId,
          },
        },
        author: {
          connect: {
            id: senderId,
          },
        },
        sender: {
          connect: {
            id: senderId,
          },
        },
        value: value,
      },
    });
    return { status: true, message: "Success" };
  } catch (e) {
    return { status: false, message: (e as Error).message };
  }
}

export async function reply(
  messageId: string,
  parentId:string,
  senderId: string,
  value: string
) {
  try {
    const comment = await prisma.message.create({
      data: {
        replyFor: {
          connect: {
            id: messageId,
          },
        },
        parent: {
          connect: {
            id: parentId,
          },
        },
        author: {
          connect: {
            id: senderId,
          },
        },
        sender: {
          connect: {
            id: senderId,
          },
        },
        value: value,
      },
    });
    return { status: true, message: "Success" };
  } catch (e) {
    return { status: false, message: (e as Error).message };
  }
}

export async function getMessages(page: number, threadId: string){
  try {
    const messages = await prisma.message.findMany({
      skip: 20*(page? page: 0),
      take: 20,
      where: {
        threadId: threadId
      },
      orderBy: {
        upVotes: "desc"
      },
      select: {
        sender: {
          select: {
            nickName: true
          }
        }, 
        author: {
          select: {
            nickName: true
          }
        },
        value: true,
        id: true,
        threadId: true,
        upVotes: true,
        replyFor: {
          select: {
            id: true
          }
        },

      }
    });
    return {status: true, data: messages}
  } catch (e) {
    return {status: false, message: (e as Error).message}
  }
}

export async function getComment(page: number, messageId: string){
  try {
    const comments = await prisma.message.findMany({
      skip: 10 * (page ? page : 0),
      take: 10,
      where: {
        parentId: messageId,
      },
      select: {
        sender: {
          select: {
            nickName: true,
          },
        },
        author: {
          select: {
            nickName: true,
          },
        },
        value: true,
        id: true,
        parentId: true,
        upVotes: true,
        replyFor: {
          select: {
            id: true,
          },
        },
      },
      orderBy: {
        upVotes: "desc",
      },
    });
    return {status: true, data: comments}
  } catch (e) {
    return {status: false, message: (e as Error).message}
  }
}
