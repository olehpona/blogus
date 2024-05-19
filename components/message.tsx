"use client";
import { MessageInfo } from "@/lib/types";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import {
  ArrowDown,
  ArrowUp,
  ChevronsUpDown,
  MessageSquareReply,
} from "lucide-react";
import { Button } from "./ui/button";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import "./styles/Markdown.css";
import { useEffect, useRef, useState } from "react";
import { useCommentStore } from "@/lib/stores/comment";
import upVoteAction from "@/lib/actions/upVote";

export default function MessageCard(props: {
  data: MessageInfo;
  className?: string;
  commentButtonStateChange?: (state?: boolean) => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const [contentHeight, setContentHeight] = useState(-1);
  const contentRef = useRef<HTMLDivElement>(null);
  const setData = useCommentStore((state) => state.set);

  useEffect(() => {
    setContentHeight((contentRef.current as HTMLDivElement).scrollHeight);
  }, []);

  return (
    <>
      <Card id={props.data.id} className={"w-full " + props.className}>
        <CardHeader className="text-sm flex-row space-y-0 space-x-3 w-full">
          {props.data.authorNick !== props.data.senderNick ? (
            <>
              <p>
                Sended by:{" "}
                <span className="font-medium">{props.data.senderNick}</span>
              </p>
              <p>
                Wrote by:{" "}
                <span className="font-medium">{props.data.authorNick}</span>
              </p>
            </>
          ) : (
            <>
              <p>
                Wrote by:{" "}
                <span className="font-medium">{props.data.senderNick}</span>
              </p>
            </>
          )}
          {props.data.replyFor ? (
            <p>
              Reply for:{" "}
              <a href={`#${props.data.replyFor.id}`}>
                <span className="font-medium">
                  {props.data.replyFor.nickName}
                </span>{" "}
                {props.data.replyFor.value}
              </a>
            </p>
          ) : (
            <></>
          )}
        </CardHeader>
        <CardContent>
          <div
            ref={contentRef}
            className={"overflow-y-hidden " + (expanded ? "" : "max-h-14")}
          >
            <Markdown className="md" remarkPlugins={[remarkGfm]}>
              {props.data.value}
            </Markdown>
          </div>
          <div
            onClick={() => {
              setExpanded(!expanded);
              props.commentButtonStateChange
                ? props.commentButtonStateChange(false)
                : {};
            }}
            className={
              "cursor-pointer w-full flex justify-center font-medium relative " +
              "after:content-[  ] after:absolute after:top-1/2 after:right-0 after:border-2 after:rounded-lg after:border-black after:w-full " +
              (contentHeight > 56 ? "" : "hidden")
            }
          >
            <p className="bg-white z-10 px-2 relative w-fit">
              {expanded ? "Close" : "Expand"}
            </p>
          </div>
        </CardContent>
        <CardFooter className="w-full sm:flex-row flex-col-reverse justify-between">
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="icon"
              className={props.commentButtonStateChange ? "" : "hidden"}
              onClick={() => {
                setExpanded(false);
                props.commentButtonStateChange
                  ? props.commentButtonStateChange()
                  : {};
              }}
            >
              <ChevronsUpDown></ChevronsUpDown>
            </Button>
            <Button
              onClick={() =>
                props.commentButtonStateChange
                  ? setData(props.data, "comment")
                  : setData(props.data, "reply")
              }
              variant="outline"
              size="icon"
            >
              <MessageSquareReply />
            </Button>
          </div>
          <div className="flex space-x-2 sm:mb-0 mb-2 sm:justify-normal justify-between w-full sm:w-auto">
            <Button onClick={() => upVoteAction(props.data.id)} variant="outline" size="icon">
              <ArrowUp /> <span>{props.data.upVotes}</span>
            </Button>
          </div>
        </CardFooter>
      </Card>
    </>
  );
}
