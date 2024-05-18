"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "../ui/textarea";
import { ThreadInfo } from "@/lib/types";
import { useState } from "react";

export default function ThreadForm(props: {
  threads: ThreadInfo[];
  setThreads: (data: ThreadInfo[]) => void;
  setOpen: (data: boolean) => void,
  parentId?: string;
}) {
  const formSchema = z.object({
    name: z
      .string()
      .min(1, { message: "Should be defined" })
      .max(50, { message: "Max length 50 symbols" }),
    description: z.string().max(200, "Max length 200 symbols"),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });
  const [message, setMessage] = useState("");

  function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      fetch("/api/thread/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ parentId: props.parentId, ...values }),
      }).then((res) => res.json().then((data) => {
        if (res.ok){
          props.setThreads([{name: values.name, description: values.description, id: data.id, parentId: props.parentId? props.parentId: null}, ...props.threads])
          props.setOpen(false)
        } else {
          setMessage("Some thing went wrong");
        }
      }));
    } catch {
      setMessage("Some thing went wrong");
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <p className={"text-xl font-bold"}>{message}</p>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Thread name</FormLabel>
              <FormControl>
                <Input placeholder="name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Thread description</FormLabel>
              <FormControl>
                <Textarea placeholder="description" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">Create</Button>
      </form>
    </Form>
  );
}
