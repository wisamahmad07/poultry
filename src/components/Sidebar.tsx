"use client";

import {
  Command,
  CommandList,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command";
import {
  LayoutDashboard,
  RectangleEllipsis,
  Box,
  HeartPulse,
  Egg,
  MessageSquare,
  Calculator,
} from "lucide-react";
import { FaDisease } from "react-icons/fa";
import { GiChicken } from "react-icons/gi";
import Logo from "@/app/assets/poultry pro logo.png";
import Image from "next/image";

type MenuItem = {
  link: string;
  icon: JSX.Element;
  text: string;
};
type BelowMenuItem = {
  link: string;
  text: string;
};

const Sidebar = () => {
  const menuList: MenuItem[] = [
    { link: "/", icon: <LayoutDashboard />, text: "Dashboard" },
    { link: "/", icon: <RectangleEllipsis />, text: "Batches" },
    { link: "/", icon: <Box />, text: "Feed" },
    { link: "/", icon: <FaDisease />, text: "Disease" },
    { link: "/", icon: <GiChicken />, text: "Chickens" },
    { link: "/", icon: <HeartPulse />, text: "Chick Health" },
    { link: "/", icon: <Egg />, text: "Egg" },
    { link: "/", icon: <MessageSquare />, text: "Chat" },
    { link: "/", icon: <Calculator />, text: "Calculation" },
  ];
  const BelowMenuList: BelowMenuItem[] = [
    { link: "/", text: "Notification" },
    { link: "/", text: "Settings" },
    { link: "/", text: "Logout" },
  ];

  return (
    <div className="flex flex-col w-[300px] min-w-[300px] gap-2 border-r min-h-screen p-4">
      <Image src={Logo} alt="Logo" width={200} height={100} className="p-2" />
      <div className="grow">
        <Command style={{ overflow: "visible" }}>
          <CommandList style={{ overflow: "visible" }}>
            {menuList.map((items: MenuItem, key: number) => (
              <CommandGroup key={key}>
                <CommandItem className="flex gap-2 cursor-pointer">
                  {items.icon}
                  {items.text}
                </CommandItem>
              </CommandGroup>
            ))}
          </CommandList>
        </Command>
      </div>
      <div>
        <Command style={{ overflow: "visible", paddingBottom: "8px" }}>
          <CommandList style={{ overflow: "visible" }}>
            {BelowMenuList.map((items: BelowMenuItem, key: number) => (
              <CommandGroup key={key}>
                <CommandItem className="flex gap-2 cursor-pointer pb-2">
                  {items.text}
                </CommandItem>
              </CommandGroup>
            ))}
          </CommandList>
        </Command>
      </div>
    </div>
  );
};

export default Sidebar;
