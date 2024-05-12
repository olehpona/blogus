"use client"
import { useUserStore } from "@/lib/stores/user";
import SignModal from "./signModal";


export default function Title(){
    const user = useUserStore((state) => state.user)
    return (
      <div className="flex flex-col items-center space-y-4">
        <h1 className="text-3xl font-semibold">Blogus</h1>
        <div className="flex space-x-2">
          { user?
            <p className="text-xl font-medium">Welcome {user.nickName}</p>:
            <SignModal
            triggerClassName={
              "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
            }
          />}
        </div>
      </div>
    );
}