"use client";
import { Button } from "@/components/ui/button";
import {
	Drawer,
	// DrawerClose,
	DrawerContent,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from "@/components/ui/drawer";
import { Bell, Ellipsis } from "lucide-react";
import { NewBatch } from "./NewBatch";
import { ModeToggle } from "./DarkMode";
import React from "react";
import { UserButton } from "@clerk/nextjs";
const Navbar = () => {
	return (
		<>
			<div className="hidden md:flex justify-between items-center p-2 px-6 m-4 bg-slate-700 rounded">
				<div className="hidden lg:flex font-bold text-white">
					<p>Date: {new Date().toLocaleDateString()}</p>
				</div>
				<NewBatch />
				<Button variant="outline">
					<Bell />
					Notification
				</Button>
				<ModeToggle />
				<UserButton
					appearance={{
						elements: {
							avatarBox: "size-10",
						},
					}}
				/>
			</div>

			<Drawer>
				<DrawerTrigger asChild>
					<div className="md:hidden flex justify-end items-center p-2 m-2 text-slate-700 cursor-pointer">
						<Ellipsis className="h-6 w-6 text-primary" />
					</div>
				</DrawerTrigger>
				<DrawerContent>
					<div className="mx-auto w-full max-w-sm">
						<DrawerHeader>
							<DrawerTitle className="text-center">Navigation</DrawerTitle>
						</DrawerHeader>
						<DrawerFooter>
							<span className="self-center">
								<UserButton
									appearance={{
										elements: {
											avatarBox: "size-10",
										},
									}}
								/>
							</span>
							<NewBatch />
							<Button variant="outline">
								<Bell />
								Notification
							</Button>
							<ModeToggle />

							{/* 
							<DrawerClose asChild>
								<Button variant="outline">Cancel</Button>
							</DrawerClose> */}
						</DrawerFooter>
					</div>
				</DrawerContent>
			</Drawer>
		</>
	);
};

export default Navbar;
