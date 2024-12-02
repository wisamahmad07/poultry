import React from "react";
import SidebarClient from "./SidebarClient";
import Logout from "./logout";
import { handleLogout } from "@/lib/session";

const Sidebar = () => {
  return (
    <>
      <SidebarClient logout={<Logout handleLogout={handleLogout} />} />
    </>
  );
};

export default Sidebar;
