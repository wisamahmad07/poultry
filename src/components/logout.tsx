"use client";
import React from "react";
interface Props {
  handleLogout: () => void;
}

const Logout = ({ handleLogout }: Props) => {
  return (
    <div
      onClick={() => {
        handleLogout();
      }}
      className="text-base cursor-pointer"
    >
      <div className="w-7 rounded-full mr-2"></div>
      <p className="text-sm">Logout</p>
    </div>
  );
};

export default Logout;
