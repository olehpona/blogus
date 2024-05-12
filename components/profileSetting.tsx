import ProfileForm from "./forms/profile";
import { dropdownItemStyle } from "./ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";

export default function ProfileSettings() {
  return (
      <Sheet>
        <SheetTrigger className={dropdownItemStyle() + " w-full"}>
          Profile
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Profile</SheetTitle>
          </SheetHeader>
          <ProfileForm data={{
            email: "test@test",
            firstName: "TEST",
            lastName: "TEST",
            nickName: "TEST"
          }}></ProfileForm>
        </SheetContent>
      </Sheet>
  );
}
