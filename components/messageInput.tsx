"use client";
import { useRef } from "react";
import { Card, CardContent } from "./ui/card";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { useCommentStore } from "@/lib/stores/comment";
import { X } from "lucide-react";

export default function MessageInput() {
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [comment, setComment] = useCommentStore((state) => [
    state.comment,
    state.setComment,
  ]);

  return (
    <>
      <Card className="w-[calc(100%-1rem)] fixed bottom-2 sm:max-h-28 h-fit z-10 py-1 px-2 space-y-1.5 shadow-lg">
        {comment ? (
          <div className="h-4 text-sm flex justify-between">
            <p>
              <span className="font-bold">Comment for:</span>{" "}
              <span className="font-medium">{comment.senderNick} </span>
              {comment.value.slice(0, 30).replace(/\W*\s*$/, "...")}
            </p>
            <button onClick={() => setComment(null)}>
              <X/>
            </button>
          </div>
        ) : (
          <></>
        )}
        <CardContent className="sm:space-x-2 sm:space-y-0 space-y-2 flex sm:flex-row flex-col h-20 items-center p-0">
          <Textarea ref={inputRef} placeholder="Message"></Textarea>
          <Button size="custom" className="sm:h-full h-8 sm:w-[10%] w-full">
            Post
          </Button>
        </CardContent>
      </Card>
    </>
  );
}
