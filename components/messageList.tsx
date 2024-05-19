"use client"
import { MessageInfo } from "@/lib/types";
import { useState } from "react";
import MessageCard from "./message";
import { getMessageAction } from "@/lib/actions/message";
import MessageGroup from "./messageGroup";

export default function MessageList(props: {
  threadId: string;
  init: MessageInfo[];
}) {
  const [messages, setMessages] = useState<MessageInfo[]>(props.init);
  const [message, setMessage] = useState("");
  let page = 1;
  function loadMore() {
    getMessageAction(messages, page++, props.threadId).then((data) => {
      if (data.status) {
        setMessages(data.data as MessageInfo[]);
      } else {
        setMessage(data.message as string);
      }
    });
  }
  return (
    <>
      {messages.map((message) => (
        <MessageGroup key={message.id} data={message} />
      ))}
      <p className="text-xl w-full text-center font-semibold">{message}</p>
      <button onClick={() => loadMore()} className="w-full text-xl font-bold text-center">
        Load More
      </button>
    </>
  );
}
