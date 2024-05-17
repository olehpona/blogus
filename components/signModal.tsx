"use client"
import { TabsContent } from "@radix-ui/react-tabs";
import { Dialog, DialogContent, DialogTrigger, } from "./ui/dialog";
import { Tabs, TabsTrigger, TabsList } from "./ui/tabs";
import SignInForm from "./forms/signIn";
import SignUpForm from "./forms/signUp";
import { useState, useEffect } from "react";
import { useUserStore } from "@/lib/stores/user";
import { Guard } from "@/lib/api/guard";


export default function SignModal(props: {triggerClassName: string}){
    const [open, setOpen] = useState(false)
    const setUser = useUserStore((state) =>  state.setUser);

    useEffect(() => {
      const updateUser = async () => {
        const user = await Guard();
        setUser(user);
      };
      updateUser();
    }, [open])

    return (
      <>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger className={props.triggerClassName}>
            Sign in<span className="font-bold">/</span> up
          </DialogTrigger>
          <DialogContent className="w-full ">
            <Tabs className="w-full space-y-4 py-4" defaultValue="sign-in">
              <TabsList className="w-full">
                <TabsTrigger className="w-1/2" value="sign-in">
                  Sign In
                </TabsTrigger>
                <TabsTrigger className="w-1/2" value="sign-up">
                  Sign Up
                </TabsTrigger>
              </TabsList>
              <TabsContent className="space-y-2" value="sign-in">
                <SignInForm setOpen={setOpen} />
              </TabsContent>
              <TabsContent className="space-y-2" value="sign-up">
                <SignUpForm setOpen={setOpen} />
              </TabsContent>
            </Tabs>
          </DialogContent>
        </Dialog>
      </>
    );
}