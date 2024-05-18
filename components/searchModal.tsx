"use client";
import { useRef, useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { Input } from "./ui/input";
import ThreadCard from "./threadCard";
import { ThreadInfo } from "@/lib/types";

export default function SearchModal(props: { triggerClassName: string }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [data, setData] = useState<ThreadInfo[]>([]);
  const [message, setMessage] = useState("");

  function onChange() {
    try {
      fetch("/api/thread/search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          search: (inputRef.current as HTMLInputElement).value,
        }),
      }).then((res) =>
        res.json().then((data) => {
          if (res.ok) {
            setData(
              data.data.map(
                (el: {
                  name: string;
                  description: string;
                  _id: { $oid: string };
                  parentId?: string | null;
                }) => ({
                  name: el.name,
                  description: el.description,
                  id: el._id["$oid"],
                  parentId: el.parentId,
                })
              )
            );
          } else {
            setMessage("Something went wrong");
          }
        })
      );
    } catch {
      setMessage("Something went wrong");
    }
  }

  return (
    <Dialog>
      <DialogTrigger className={props.triggerClassName}>Search</DialogTrigger>
      <DialogContent className="w-full max-h-dvh overflow-y-auto">
        <Input
          ref={inputRef}
          onChange={onChange}
          placeholder="Search"
          className="w-full mt-6"
        />
        <div className="w-full flex flex-col space-y-2">
          <p className="text-xl font-bold">{message}</p>
          {data.map((thread) => (
            <ThreadCard key={thread.id} data={thread} />
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
