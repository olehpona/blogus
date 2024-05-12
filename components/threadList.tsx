import { ThreadInfo } from "@/lib/types";
import ThreadCard from "./threadCard";
import { Key } from "react";
import { Button } from "./ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";
import { CornerLeftUp, CornerRightDown } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";

export default function ThreadList(props: { data: ThreadInfo[] }) {
  const items = props.data.map((el) => {
    return (
      <ThreadCard
        name={el.name}
        description={el.description}
        key={el.id as Key}
      ></ThreadCard>
    );
  });

  return (
    <div className="w-full">
      <Collapsible className="flex flex-col items-center w-full">
        <CollapsibleTrigger className="font-medium flex items-center">
          <CornerLeftUp />
          Child thread
          <CornerRightDown />
        </CollapsibleTrigger>
        <CollapsibleContent className="w-full space-y-3 mt-4 flex flex-col items-center">
          <div className="w-full space-y-2">{items}</div>
          <div className="w-full px-2 space-y-1">
            <Popover>
              <PopoverTrigger asChild>
                <Button className="w-full">New thread</Button>
              </PopoverTrigger>
              <PopoverContent className="space-y-2">
                <Input placeholder="Name"></Input>
                <Textarea placeholder="Description" />
                <Button className="w-full">Create</Button>
              </PopoverContent>
            </Popover>
            <Button variant="outline" className="w-full">
              Load more
            </Button>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}
