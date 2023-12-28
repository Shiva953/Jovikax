'use client'
import { signIn,signOut, useSession } from "next-auth/react"
import { Button } from "./ui/button";
import { Avatar,AvatarImage,AvatarFallback } from "../components/ui/avatar";
import { DropdownMenu,DropdownMenuContent,DropdownMenuItem,DropdownMenuLabel,DropdownMenuTrigger,DropdownMenuSeparator } from "./ui/dropdown-menu";
import { NavigationMenu,NavigationMenuItem,NavigationMenuList,NavigationMenuLink } from "./ui/navigation-menu";
import { ChevronDownIcon } from "@radix-ui/react-icons";

import Link from "next/link";
function AuthButton(){
    const { data: session, status } = useSession(); //the server session
    //sign in or out depending upon session
    return (
        <NavigationMenu className="h-16 overflow-hidden p-4">
          <NavigationMenuList className="flex w-screen items-center justify-between gap-4 px-4 md:px-8">
            <NavigationMenuItem>
              <Link href="/" legacyBehavior passHref>
                <NavigationMenuLink className="font-bold text-pink-300">
                  Jovikax
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            {session && session.user ? (
              <div className="item-center flex justify-center gap-4">
                <NavigationMenuItem>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <DropdownMenu>
                    <DropdownMenuTrigger className="flex items-center gap-2">
                      <Avatar className="h-6 w-6">
                        <AvatarImage
                          src={`https://i.imgur.com/bMH6qNc.png`}
                        />
                        <AvatarFallback>
                          {session?.user?.email!.slice(0, 2)}
                        </AvatarFallback>
                      </Avatar>
                      <span className="hidden md:block">
                        {session?.user?.name ?? session?.user?.email}
                      </span>{" "}
                      <ChevronDownIcon />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuSeparator />
                      {/* <DropdownMenuItem>
                        {session?.user?.name ? (
                          `@${session?.user?.name}`
                        ) : (
                          <span className="italic text-neutral-950 dark:text-neutral-50">
                            No name set
                          </span>
                        )}
                      </DropdownMenuItem> */}
                      {/* <DropdownMenuItem>{session?.user?.email}</DropdownMenuItem> */}
                      {/* <DropdownMenuItem>
                        <Link className="h-full w-full" href={`/@${auth.user.username}/settings`}>Settings</Link>
                      </DropdownMenuItem> */}
                      <DropdownMenuItem>
                        <Button onClick={() => {signOut()}}>Sign Out</Button>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </NavigationMenuItem>
              </div>
            ) : (
                <Button onClick={() => {signIn()}}>Sign In</Button>
            )}
          </NavigationMenuList>
        </NavigationMenu>
      );
}

export default function NavMenu(){
    return(
        <div>
            <AuthButton/>
        </div>
    )
}