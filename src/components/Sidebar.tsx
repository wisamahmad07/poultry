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
  X,
  Menu,
} from "lucide-react";
import { useState } from "react";
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
  const [isOpen, setIsOpen] = useState(false);
  const menuList: MenuItem[] = [
    { link: "/", icon: <LayoutDashboard />, text: "Dashboard" },
    { link: "/", icon: <RectangleEllipsis />, text: "Batch Management" },
    { link: "/", icon: <Box />, text: "Feed Stock Management" },
    { link: "/", icon: <FaDisease />, text: "Disease & Medicine" },
    { link: "/", icon: <GiChicken />, text: "Chicken System" },
    { link: "/", icon: <HeartPulse />, text: "Chicken Health Monitoring" },
    { link: "/", icon: <Egg />, text: "Egg Counting" },
    { link: "/", icon: <MessageSquare />, text: "Chatbot" },
    { link: "/", icon: <Calculator />, text: "Area & Profit Analysis" },
  ];
  const BelowMenuList: BelowMenuItem[] = [
    { link: "/", text: "Profile" },
    { link: "/", text: "Notification" },
    { link: "/", text: "Logout" },
  ];

  return (
    <>
      {/* Toggle Button */}
      <button
        className="md:hidden p-2 m-2 text-slate-700"
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "Close Menu" : "Open Menu"}
      >
        {isOpen ? "" : <Menu className="w-6 h-6" />}
      </button>

      {/* Overlay and Sidebar for Mobile */}
      {isOpen && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => setIsOpen(false)}
          ></div>

          {/* Sidebar */}
          <div className="fixed top-0 left-0 flex flex-col w-[300px] min-w-[300px] gap-2 border-r min-h-screen p-4 bg-slate-700 z-50 opacity-90">
            <div className="flex ">
              <Image
                src={Logo}
                alt="Logo"
                width={200}
                height={100}
                className="p-2"
              />
              {/* Close Button */}
              <button
                className="md:hidden p-2 m-2 text-slate-700"
                onClick={() => setIsOpen(false)}
                aria-label="Close Menu"
              >
                <X className="w-6 h-6 text-white" />
              </button>
            </div>
            <div className="grow ">
              <Command style={{ overflow: "visible" }}>
                <CommandList style={{ overflow: "visible" }}>
                  {menuList.map((items: MenuItem, key: number) => (
                    <CommandGroup key={key}>
                      <CommandItem className="flex gap-2 cursor-pointer ">
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
                      <CommandItem className="flex gap-2 cursor-pointer pb-2 justify-center">
                        {items.text}
                      </CommandItem>
                    </CommandGroup>
                  ))}
                </CommandList>
              </Command>
            </div>
          </div>
        </>
      )}

      {/* Sidebar for Desktop */}
      <div
        className={`${
          isOpen ? "hidden" : "hidden"
        } md:flex flex-col w-[300px] min-w-[300px] gap-2 border-r min-h-screen p-4 bg-slate-700`}
      >
        <div className="flex justify-center">
          <Image
            src={Logo}
            alt="Logo"
            width={200}
            height={100}
            className="p-2"
          />
        </div>
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
                  <CommandItem className="flex gap-2 cursor-pointer pb-2 justify-center">
                    {items.text}
                  </CommandItem>
                </CommandGroup>
              ))}
            </CommandList>
          </Command>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
