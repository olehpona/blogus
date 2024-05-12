import BreadGenerator from "@/components/breadGenerator";
import SearchBar from "@/components/forum/searchbar";
import MessageGroup from "@/components/messageGroup";
import MessageInput from "@/components/messageInput";
import ThreadList from "@/components/threadList";

export default function Forum(){
    return (
      <>
        <div className="w-full grow h-full flex flex-col px-2 py-4 items-center">
          <div className="w-[80%] flex flex-col space-y-4 items-center">
            <SearchBar />
            <div className="w-full">
              <BreadGenerator data={["a", "b", "c"]} />
            </div>
            <ThreadList
              data={[
                { name: "TEST1", description: "TEST1", id: "1" },
                { name: "TEST2", description: "TEST2", id: "2" },
                { name: "TEST3", description: "TEST3", id: "3" },
              ]}
            ></ThreadList>
            <MessageGroup></MessageGroup>
            <MessageGroup></MessageGroup>
            <span className="h-24"></span>
          </div>
          <MessageInput />
        </div>
      </>
    );
}