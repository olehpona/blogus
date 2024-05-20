import BreadGenerator from "@/components/breadGenerator";
import MessageInput from "@/components/messageInput";
import MessageList from "@/components/messageList";
import SearchModal from "@/components/searchModal";
import ThreadList from "@/components/threadList";
import { getMessageAction } from "@/lib/actions/message";
import { getParentHierarchy, getThreads } from "@/lib/api/threadService";
import { ThreadInfo } from "@/lib/types";

export const revalidate = 360

export default async function Forum({ params }: { params: { id: string } }) {
  const hierarchy = (await getParentHierarchy(params.id))
    .map((thread) => ({ name: thread.name, id: thread.id }))
    .reverse();
  const threads = await getThreads(0, params.id);
  const messages = await getMessageAction([], 0, params.id);
  return (
    <>
      <div className="w-full grow h-full flex flex-col px-2 py-4 items-center">
        <div className="w-[80%] flex flex-col space-y-4 items-center">
          <SearchModal triggerClassName="w-full inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2" />
          <div className="w-full">
            <BreadGenerator data={hierarchy} />
          </div>
          <ThreadList
            data={threads.status ? (threads.data as ThreadInfo[]) : []}
            id={params.id}
          />
          <MessageList threadId={params.id} init={messages.data? messages.data: []}/>
          <span className="h-24"></span>
        </div>
        <MessageInput threadId={params.id} />
      </div>
    </>
  );
}
