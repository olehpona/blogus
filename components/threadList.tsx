import { ThreadInfo } from "@/lib/types";
import ThreadCard from "./thread-card";
import { Key } from "react";
import { Button } from "./ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./ui/collapsible";
import { CornerLeftUp, CornerRightDown } from "lucide-react";

export default function ThreadList( props: {data: ThreadInfo[]}){
    const items = props.data.map((el) => {
        return <ThreadCard name={el.name} description={el.description} key={el.id as Key}></ThreadCard>
    })

    return (
      <div className="w-full">
        <Collapsible className="flex flex-col items-center w-full">
          <CollapsibleTrigger className="font-medium flex items-center">
            <CornerLeftUp/>
            Child thread
            <CornerRightDown/>
            </CollapsibleTrigger>
          <CollapsibleContent className="w-full space-y-1 mt-2 flex flex-col items-center">
            {items}
            <Button>Load more</Button>
          </CollapsibleContent>
        </Collapsible>
      </div>
    );
}