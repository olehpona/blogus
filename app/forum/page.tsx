import BreadGenerator from "@/components/bread-generator";
import SearchBar from "@/components/forum/searchbar";
import MessageCard from "@/components/message";
import ThreadList from "@/components/threadList";

export default function Forum(){
    return (
      <>
        <div className="w-full grow flex flex-col items-center py-16">
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
            <MessageCard data={{value: "test", senderNick:"test1", authorNick:"test2", id: "test3"}} />
          </div>
        </div>
      </>
    );
}