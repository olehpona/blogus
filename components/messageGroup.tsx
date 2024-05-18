"use client"
import { useState } from "react";
import MessageCard from "./message";

export default function MessageGroup(){
    const [showComment, setShowComment] = useState(false)

    function changeCommentState(state = !showComment){
      setShowComment(state)
    }

    return (
      <>
        <div className="w-full relative space-y-4">
          <MessageCard
            data={{
              value: `![Image alt](https://f8n-production.s3.amazonaws.com/creators/profile/c8gley51s-nyan-cat-large-gif-gif-mbf1sa.gif)
`,
              senderNick: "test1",
              authorNick: "test2",
              id: "test3",
              upVotes: 0,
            }}
            className="sticky top-4 shadow-lg"
            commentButtonStateChange={changeCommentState}
          />
          <div
            className={
              "w-full p-4 flex-col items-center space-y-2 " +
              (showComment ? "flex" : "hidden")
            }
          >
            <MessageCard
              data={{
                value: "test",
                senderNick: "test1",
                authorNick: "test2",
                id: "test3",
                upVotes: 0,
              }}
              parent={{
                value: "test",
                senderNick: "test1",
                authorNick: "test2",
                id: "test3",
                upVotes: 0,
              }}
            />
            <MessageCard
              data={{
                value: "test",
                senderNick: "test1",
                authorNick: "test2",
                id: "test3",
                upVotes: 0,
              }}
              parent={{
                value: "test",
                senderNick: "test1",
                authorNick: "test2",
                id: "test3",
                upVotes: 0,
              }}
            />
          </div>
        </div>
      </>
    );
}