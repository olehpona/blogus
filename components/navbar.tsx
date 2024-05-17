"use client";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  dropdownItemStyle,
} from "./ui/dropdown-menu";
import SignModal from "./signModal";
import ProfileSettings from "./profileSetting";
import { useUserStore } from "@/lib/stores/user";
import { useEffect } from "react";
import { Guard } from "@/lib/api/guard";

export default function NavBar() {
  
  const [user, setUser] = useUserStore((state) => [state.user, state.setUser]);

  useEffect(() => {
    const updateUser = async () => {
      const user = await Guard();
      setUser(user)
    }
    updateUser()
  }, [])


  return (
    <nav className="w-full shadow-md h-fit p-2">
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <Link href="/">
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Home
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/forum">
              <NavigationMenuLink
                className={
                  user
                    ? navigationMenuTriggerStyle()
                    : navigationMenuTriggerStyle() +
                      " text-gray-500 hover:text-gray-500 cursor-default"
                }
                style={
                  user
                    ? {}
                    : {
                        backgroundColor: "white",
                      }
                }
              >
                Forum
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger className={navigationMenuTriggerStyle()}>
                Profile
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {user ? (
                  <>
                    <ProfileSettings></ProfileSettings>
                    <DropdownMenuItem>Liked</DropdownMenuItem>
                    <DropdownMenuItem>Posts</DropdownMenuItem>
                    <DropdownMenuItem>Log out</DropdownMenuItem>
                  </>
                ) : (
                  <>
                    <SignModal
                      triggerClassName={dropdownItemStyle() + " w-full"}
                    />
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </nav>
  );
}
