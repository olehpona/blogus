"use client";
import { Card, CardContent } from "./ui/card";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { useCommentStore } from "@/lib/stores/comment";
import { X } from "lucide-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form";

export default function MessageInput(props: {threadId: string}) {
  const [comment,type, setData, clearData] = useCommentStore((state) => [
    state.comment,
    state.type,
    state.set,
    state.clear
  ]);

  const formSchema = z.object({
    message: z.string().min(1, {message: "Please write some text"}).max(5000, {message: "Max length 5000 symbols"})
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      message: ""
    }
  })

  function getPayload(value: string){
    if (comment){
      if (type === "comment"){
        return {
          type: "comment",
          value: value,
          messageId: comment.id
        }
      }
      return {
        type: "reply",
        messageId: comment.parentId,
        replyFor: comment.id,
        value: value
      }
    }
    return {
      type: "message",
      threadId: props.threadId,
      value: value
    }
  }

  function onSubmit(value: z.infer<typeof formSchema>){
    console.log(comment)
    fetch("/api/message/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(getPayload(value.message)),
    });
  }

  return (
    <>
      <Card className="w-[calc(100%-1rem)] fixed bottom-2 sm:max-h-28 h-fit z-10 py-1 px-2 space-y-1.5 shadow-lg">
        {comment ? (
          <div className="h-4 text-sm flex justify-between">
            <p>
              <span className="font-bold">{type === "comment"? "Comment": "Reply"} for:</span>{" "}
              <span className="font-medium">{comment.senderNick} </span>
              {comment.value.slice(0, 30).replace(/\W*\s*$/, "...")}
            </p>
            <button onClick={() => clearData()}>
              <X />
            </button>
          </div>
        ) : (
          <></>
        )}
        <CardContent className="p-0">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="sm:space-x-2 sm:space-y-0 space-y-2 flex sm:flex-row flex-col h-fit items-center w-full">
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <Textarea placeholder="Message" {...field}></Textarea>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="sm:h-20 h-8 sm:w-[10%] w-full">
                <Button
                  type="submit"
                  size="custom"
                  className="w-full h-full"
                >Post</Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </>
  );
}
