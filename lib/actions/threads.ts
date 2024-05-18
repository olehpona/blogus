"use server"
import { getThreads } from "@/lib/api/threadService";
import { ThreadInfo } from "@/lib/types";

export async function loadMore(items: ThreadInfo[], page: number, id?: string) {
  const apiResponse = await getThreads(page, id);
  if (apiResponse.status) {
    if ((apiResponse.data as ThreadInfo[]).length > 0) {
      return {
        status: true,
        data: [...items, ...(apiResponse.data as ThreadInfo[])],
      };
    } else {
      return { status: false, message: "That's all" };
    }
  } else {
    return { status: false, message: "Some things went wrong :(" };
  }
}
