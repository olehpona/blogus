"use client";
import { ThreadInfo } from "@/lib/types";
import ThreadCard from "./threadCard";
import { useState } from "react";
import { Button } from "./ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";
import { CornerLeftUp, CornerRightDown } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Input } from "./ui/input";

import { loadMore } from "@/lib/actions/threads";
import ThreadForm from "./forms/thread";

export default function ThreadList(props: {
  data: ThreadInfo[];
  collapsed?: boolean;
  id?: string;
}) {
  let page = 0;
  const [items, setItems] = useState(props.data);
  const [message, setMessage] = useState("");
  const [addOpen, setAddOpen] = useState(false);

  function load() {
    loadMore(items, page+1, props.id).then((data) => {
      if (data.status) {
        if ((data.data as ThreadInfo[]).length > 0){
          page++;
        } 
        setItems(data.data as ThreadInfo[]);
      } else {
        setMessage(data.message as string);
      }
    });
  }

  return (
    <div className="w-full">
      <Collapsible
        open={props.collapsed}
        className="flex flex-col items-center w-full"
      >
        <CollapsibleTrigger
          className={
            "font-medium flex items-center " + (props.collapsed ? "hidden" : "")
          }
        >
          <CornerLeftUp />
          Child thread
          <CornerRightDown />
        </CollapsibleTrigger>
        <CollapsibleContent className="w-full space-y-3 mt-4 flex flex-col items-center">
          <div className="w-full flex flex-col space-y-2">
            {items.length > 0 ? (
              items.map((thread) => (
                <ThreadCard data={thread} key={thread.id} />
              ))
            ) : (
              <p className="w-full text-center">Oh, it&apos;s empty</p>
            )}
          </div>

          <div className="w-full px-2 space-y-1">
            <p className="text-xl font-bold w-full text-center my-2">
              {message}
            </p>
            <Popover open={addOpen} onOpenChange={setAddOpen}>
              <PopoverTrigger asChild>
                <Button className="w-full">New thread</Button>
              </PopoverTrigger>
              <PopoverContent className="space-y-2">
                <ThreadForm
                  setOpen={setAddOpen}
                  threads={items}
                  setThreads={setItems}
                  parentId={props.id}
                />
              </PopoverContent>
            </Popover>

            <Button variant="outline" className="w-full" onClick={() => load()}>
              Load more
            </Button>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}
