import { MessageInfo } from "@/lib/types";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { ChevronsUpDown, ThumbsDown, ThumbsUp } from "lucide-react";
import { Button } from "./ui/button";

export default function MessageCard(props: { data: MessageInfo }) {
  return (
    <>
      <Card className="w-full">
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
        </CardHeader>
        <CardContent>
          <p>{props.data.value}</p>
        </CardContent>
        <CardFooter className="w-full justify-between">
          <Button>
            <ChevronsUpDown></ChevronsUpDown>
          </Button>
          <div className="flex space-x-2">
            <Button>
              <ThumbsUp />
            </Button>
            <Button>
              <ThumbsDown />
            </Button>
          </div>
        </CardFooter>
      </Card>
    </>
  );
}
