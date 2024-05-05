import { Button } from "./ui/button";

export default function Title(){
    return (
      <div className="flex flex-col items-center space-y-4">
        <h1 className="text-3xl">Blogus</h1>
        <div className="flex space-x-2">
          <Button>Sign In</Button>
          <Button>Sign Up</Button>
        </div>
      </div>
    );
}