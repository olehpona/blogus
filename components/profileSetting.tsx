import { UserInfo } from "@/lib/types";
import ProfileForm from "./forms/profile";
import { dropdownItemStyle } from "./ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { useUserStore } from "@/lib/stores/user";


export default function ProfileSettings() {
  const user = useUserStore((state) => state.user);

  return (
      <Sheet>
        <SheetTrigger className={dropdownItemStyle() + " w-full"}>
          Profile
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Profile</SheetTitle>
          </SheetHeader>
          <ProfileForm data={user as UserInfo}></ProfileForm>
        </SheetContent>
      </Sheet>
  );
}
