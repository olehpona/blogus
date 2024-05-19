"use client";
import { useEffect, useState } from "react";
import MessageCard from "./message";
import { MessageInfo } from "@/lib/types";
import { getCommentAction } from "@/lib/actions/message";

export default function MessageGroup(props: { data: MessageInfo }) {
  const [showComment, setShowComment] = useState(false);
  const [comments, setComments] = useState<MessageInfo[]>([]);
  const [message, setMessage] = useState("");
  let page = 0;

  function changeCommentState(state = !showComment) {
    setShowComment(state);
  }


  function loadMore() {
    getCommentAction(comments, page++, props.data.id).then((data) => {
      if (data.status) {
        setComments(data.data as MessageInfo[]);
      } else {
        setMessage(data.message as string);
      }
    });
  }

  useEffect(() => {
    loadMore()
  }, [])

  return (
    <>
      <div className="w-full relative space-y-4">
        <MessageCard
          data={props.data}
          className="sticky top-4 shadow-lg"
          commentButtonStateChange={changeCommentState}
        />
        <div
          className={
            "w-full p-4 flex-col items-center space-y-2 " +
            (showComment ? "flex" : "hidden")
          }
        >
          {comments.map((message) => (
            <MessageCard key={message.id} data={message} />
          ))}
          <p className="text-xl w-full text-center font-semibold">{message}</p>
          <button onClick={() => loadMore()} className="w-full text-lg text-center">Load More</button>
        </div>
      </div>
    </>
  );
}
