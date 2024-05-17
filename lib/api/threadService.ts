import prisma from "../db";
import { ThreadInfo } from "../types";

export async function createThread(
  name: string,
  description: string,
  parentId: string
) {
  try {
    const newThread = await prisma.thread.create({
      data: {
        name: name,
        description: description,
      },
    });
    if (parentId) {
      const thread = await prisma.thread.update({
        where: {
          id: parentId,
        },
        data: {
          children: {
            connect: {
              id: newThread.id,
            },
          },
        },
      });
    }
    return { status: true, message: "Success" };
  } catch (e) {
    return { status: false, message: (e as Error).message };
  }
}

export async function getParentHierarchy(threadId: string) {
  let currentThread = await prisma.thread.findUnique({
    where: { id: threadId },
    select: { id: true, name: true, parentId: true, description: true }, // Only select the fields you need
  });

  if (!currentThread) {
    throw new Error("Category not found");
  }

  const hierarchy: ThreadInfo[] = [];

  while (currentThread) {
    hierarchy.push({
      id: currentThread.id,
      name: currentThread.name,
      description: currentThread.description,
    });

    if (!currentThread.parentId) {
      break;
    }

    currentThread = await prisma.thread.findUnique({
      where: { id: currentThread.parentId },
      select: { id: true, name: true, parentId: true, description: true }, // Only select the fields you need
    });

    if (!currentThread) {
      throw new Error("Parent category not found");
    }
  }

  return hierarchy;
}

export async function search(text: string) {
  try {
    const found = await prisma.thread.findRaw({
      filter: {
        $text: {
          $search: text,
        },
      },
    });
    return { status: true, data: found };
  } catch (e) {
    return { status: false };
  }
}

export async function getThreads(page: number, parentId?: string) {
  try {
    if (parentId) {
      const found = await prisma.thread.findMany({
        skip: 5 * page,
        take: 5,
        where: {
          parentId: parentId,
        },
        orderBy: {
          messages: {
            _count: "desc",
          },
        },
      });
      return { status: true, data: found };
    } else {
      const found = await prisma.thread.findMany({
        skip: 5 * page,
        take: 5,
        orderBy: {
          messages: {
            _count: "desc",
          },
        },
      });
      return { status: true, data: found };
    }
  } catch (e) {
    return { status: false, message: (e as Error).message };
  }
}
