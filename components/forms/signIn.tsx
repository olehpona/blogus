import { Button } from "../ui/button";
import { Input } from "../ui/input";

export default function SignInForm(){
    return (
      <>
        <Input className="w-full" placeholder="Email"></Input>
        <Input className="w-full" placeholder="Password"></Input>
        <Button className="w-full">Sign In</Button>
      </>
    );
}