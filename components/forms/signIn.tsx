"use client";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignInForm(props: {setOpen: (state: boolean) => void}) {
  const router = useRouter()
  const formSchema = z.object({
    email: z.string().regex(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g, {
      message: "Must be email address",
    }),
    password: z.string(),
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [globalError, setGlobalError] = useState("");
  function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      fetch("/api/user/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      }).then((res) => {
        res.json().then((json) => {
          if (res.ok) {
            {
              props.setOpen(false)
            }
          } else {
            setGlobalError(json.message);
          }
        });
      });
    } catch (error) {
      setGlobalError("An error occurred during signin");
    }
  }

  return (
    <Form {...form}>
      {globalError ? (
        <p className="text-red font-bold, text-2xl">{globalError}</p>
      ) : (
        <></>
      )}
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  className="w-full"
                  placeholder="Email"
                  {...field}
                ></Input>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  className="w-full"
                  placeholder="Password"
                  {...field}
                ></Input>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">
          Sign In
        </Button>
      </form>
    </Form>
  );
}
