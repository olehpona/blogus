import { UserInfo } from "@/lib/types";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useEffect, useRef } from "react";

export default function ProfileForm(props: { data: UserInfo }) {
  const firstName = useRef<HTMLInputElement>(null);
  const lastName = useRef<HTMLInputElement>(null);
  const email = useRef<HTMLInputElement>(null);
  const nickName = useRef<HTMLInputElement>(null);

  useEffect(() => {
    (firstName.current as HTMLInputElement).value = props.data.firstName;
    (lastName.current as HTMLInputElement).value = props.data.lastName;
    (email.current as HTMLInputElement).value = props.data.email;
    (nickName.current as HTMLInputElement).value = props.data.nickName;
  }, []);

  return (
    <div className="space-y-4 mt-2">
      <div className="w-full space-y-1">
        <Input
          ref={firstName}
          className="w-full"
          placeholder="First name"
        ></Input>
        <Input
          ref={lastName}
          className="w-full"
          placeholder="Last name"
        ></Input>
        <Input ref={email} className="w-full" placeholder="Email"></Input>
        <Input
          ref={nickName}
          className="w-full"
          placeholder="Nick name"
        ></Input>
        <Button className="w-full">Update profile</Button>
      </div>
      <div className="w-full space-y-1">
        <Input className="w-full" placeholder="New password"></Input>
        <Input className="w-full" placeholder="New password confirm"></Input>
        <Button className="w-full">Update password</Button>
      </div>
    </div>
  );
}
