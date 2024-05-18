import { UserInfo } from "@/lib/types";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { Guard } from "@/lib/api/guard";
import { useUserStore } from "@/lib/stores/user";


export default function ProfileForm(props: { data: UserInfo }) {
  const userFormSchema = z.object({
    firstName: z.string().min(1, { message: "Must be minimum 1 symbol" }),
    lastName: z.string().min(1, { message: "Must be minimum 1 symbol" }),
    email: z.string().regex(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g, {
      message: "Must be email address",
    }),
    nickName: z
      .string()
      .min(3, { message: "Min length is 3 symbols" })
      .max(25, { message: "Max length is 25 symbols" }),
  });

  const userForm = useForm<z.infer<typeof userFormSchema>>({
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      firstName: props.data.firstName,
      lastName: props.data.lastName,
      email: props.data.email,
      nickName: props.data.nickName,
    },
  });

  const passwordFormSchema = z
    .object({
      password: z
        .string()
        .regex(/^(?=.*\d)(?=.*[a-zA-Z]).*$/g, {
          message: "Must contain letter and number",
        })
        .min(8, { message: "Minimum password length is 8 symbols" }),
      passwordConfirm: z.string(),
    })
    .refine((data) => data.password === data.passwordConfirm, {
      message: "Passwords don't match",
      path: ["passwordConfirm"], // set the path of the error
    });
  
    const passwordForm = useForm<z.infer<typeof passwordFormSchema>>({
      resolver: zodResolver(passwordFormSchema),
      defaultValues: {
        password: "",
        passwordConfirm: ""
      }
  })

  const setUser = useUserStore((state) => state.setUser);

  const [userUpdateGlobal, setUserUpdateGlobal] = useState("");
  const [passwordUpdateGlobal, setPasswordUpdateGlobal] = useState("");

  useEffect(() => {
    const updateUser = async () => {
      const user = await Guard();
      setUser(user);
    };
    updateUser();
  }, [userUpdateGlobal, passwordUpdateGlobal]);

  function onUserUpdate(values: z.infer<typeof userFormSchema>) {
        try {
          fetch("/api/user/update", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({id: props.data.id,...values}),
          }).then((res) => {
            res.json().then((json) => {
              if (res.ok) {
                {
                  setUserUpdateGlobal("Updated successfully")
                }
              } else {
                setUserUpdateGlobal(json.message);
              }
            });
          });
        } catch (error) {
          setUserUpdateGlobal("An error occurred during update");
        }
  };

  function onPasswordUpdate(values: z.infer<typeof passwordFormSchema>) {
    try{
          fetch("/api/user/password", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({id: props.data.id,password: values.password}),
          }).then((res) => {
            res.json().then((json) => {
              if (res.ok) {
                {
                  setPasswordUpdateGlobal("Updated successfully");
                }
              } else {
                setPasswordUpdateGlobal(json.message);
              }
            });
          });
    } catch {
      setPasswordUpdateGlobal("An error occurred during update");
    }
  }

  return (
    <div className="space-y-4 mt-2">
      <div className="w-full space-y-1">
        <Form {...userForm}>
          <form
            onSubmit={userForm.handleSubmit(onUserUpdate)}
            className="space-y-2"
          >
            <p className="text-xl">{userUpdateGlobal}</p>
            <FormField
              control={userForm.control}
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
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={userForm.control}
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
              control={userForm.control}
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
              control={userForm.control}
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
            <Button type="submit" className="w-full">
              Update Account
            </Button>
          </form>
        </Form>
      </div>
      <div className="w-full space-y-1">
        <Form {...passwordForm}>
          <form
            onSubmit={passwordForm.handleSubmit(onPasswordUpdate)}
            className="space-y-2"
          >
            <p className="text-xl">{passwordUpdateGlobal}</p>
            <FormField
              control={passwordForm.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      className="w-full"
                      placeholder="New password"
                      {...field}
                    ></Input>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={passwordForm.control}
              name="passwordConfirm"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Password Confirm</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      className="w-full"
                      placeholder="New password confirm"
                      {...field}
                    ></Input>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">
              Update password
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
