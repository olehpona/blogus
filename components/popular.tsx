import { getThreads } from "@/lib/api/threadService";
import ThreadCard from "./threadCard";
import { ThreadInfo } from "@/lib/types";

export default async function Popular() {

  const popular = await getThreads(0);

  return (
    <>
      <h2 className="text-xl">Popular threads</h2>
      <div className="w-1/2 space-y-2 flex flex-col">
        {popular.data? popular.data.map((thread: ThreadInfo) => (
          <ThreadCard key={thread.id} data={thread}/>
        )): <></>}
      </div>
    </>
  );
}
