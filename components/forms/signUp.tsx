"use client"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignUpForm(props: { setOpen: (state: boolean) => void }) {
  const router = useRouter();
  const formSchema = z
    .object({
      firstName: z.string().min(1, { message: "Must be minimum 1 symbol" }),
      lastName: z.string().min(1, { message: "Must be minimum 1 symbol" }),
      email: z.string().regex(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g, {
        message: "Must be email address",
      }),
      password: z
        .string()
        .regex(/^(?=.*\d)(?=.*[a-zA-Z]).*$/g, {
          message: "Must contain letter and number",
        })
        .min(8, { message: "Minimum password length is 8 symbols" }),
      passwordConfirm: z.string(),
      nickName: z
        .string()
        .min(3, { message: "Min length is 3 symbols" })
        .max(25, { message: "Max length is 25 symbols" }),
    })
    .refine((data) => data.password === data.passwordConfirm, {
      message: "Passwords don't match",
      path: ["passwordConfirm"], // set the path of the error
    });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      passwordConfirm: "",
      nickName: "",
    },
  });

  const [globalError, setGlobalError] = useState("");

  function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      fetch("/api/user/signup", {
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
      setGlobalError("An error occurred during signup");
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        {globalError ? (
          <p className="text-red font-bold, text-2xl">{globalError}</p>
        ) : (
          <></>
        )}
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>First name</FormLabel>
              <FormControl>
                <Input
                  className="w-full"
                  placeholder="First name"
                  {...field}
                ></Input>
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Last name</FormLabel>
              <FormControl>
                <Input
                  className="w-full"
                  placeholder="Last name"
                  {...field}
                ></Input>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
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
              <FormDescription>Your email address</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="nickName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nickname</FormLabel>
              <FormControl>
                <Input
                  className="w-full"
                  placeholder="Nick name"
                  {...field}
                ></Input>
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
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
        <FormField
          control={form.control}
          name="passwordConfirm"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password confirm</FormLabel>
              <FormControl>
                <Input
                  className="w-full"
                  placeholder="Password confirm"
                  {...field}
                ></Input>
              </FormControl>
              <FormDescription>Rewrite your password</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">
          Sign up
        </Button>
      </form>
    </Form>
  );
}