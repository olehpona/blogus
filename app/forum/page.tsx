import BreadGenerator from "@/components/breadGenerator";
import SearchBar from "@/components/forum/searchbar";
import MessageGroup from "@/components/messageGroup";
import MessageInput from "@/components/messageInput";
import SearchModal from "@/components/searchModal";
import ThreadList from "@/components/threadList";
import { getParentHierarchy, getThreads } from "@/lib/api/threadService";
import { ThreadInfo } from "@/lib/types";

export const revalidate = 360;

export default async function Forum() {
  const threads = await getThreads(0);
  return (
    <>
      <div className="w-full grow h-full flex flex-col px-2 py-4 items-center">
        <div className="w-[80%] flex flex-col space-y-4 items-center">
          <SearchModal triggerClassName="w-full inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2" />
          <span className="h-24"></span>
          <ThreadList
            collapsed
            data={threads.status ? (threads.data as ThreadInfo[]) : []}
          />
        </div>
      </div>
    </>
  );
}
