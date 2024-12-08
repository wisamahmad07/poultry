"use client";

// import React, { useActionState } from "react";
// import { loginUser } from "./action";
import loginImage from "@/app/assets/loginImage.png";
import Image from "next/image";
import { SignInButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

export default function LoginForm() {
	// const [data, action, isPending] = useActionState(loginUser, undefined);

	return (
		<div className="flex items-center justify-center min-h-screen">
			<div className="flex flex-col items-center gap-4 md:flex-row bg-slate-800 p-8 rounded-lg shadow-lg w-screen md:w-[50vw] max-w-2xl">
				<Image
					src={loginImage}
					alt="login image"
					className="w-[193px] h-[230px]"
				/>

				<Button
					asChild
					className="w-full  p-3 bg-gradient-to-r from-slate-600 to-slate-500 text-white text-lg rounded-lg hover:from-slate-500 hover:to-slate-400 transition duration-300"
				>
					<SignInButton />
				</Button>
			</div>
		</div>
	);
	// return (
	// 	<div className="flex items-center justify-center min-h-screen">
	// 		<div className="md:hidden flex flex-col bg-slate-800 p-8 rounded-lg h-full shadow-lg w-full max-w-2xl">
	// 			<div>
	// 				<div className="flex justify-center items-center py-2">
	// 					<h2 className="text-3xl font-bold text-center text-white ">
	// 						Log In
	// 					</h2>
	// 				</div>

	// 				<div className="flex justify-center items-center">
	// 					<Image
	// 						src={loginImage}
	// 						alt="login image"
	// 						height={240}
	// 						width={300}
	// 					/>
	// 				</div>
	// 				<form action={action} className="px-5">
	// 					<div className="flex flex-col">
	// 						{/* Email Field */}
	// 						<div className="mb-4">
	// 							<label
	// 								htmlFor="email"
	// 								className="block text-lg text-white mb-2"
	// 							>
	// 								Email
	// 							</label>
	// 							<input
	// 								type="email"
	// 								id="email"
	// 								name="email"
	// 								className="w-full p-3 border-2 border-slate-600 rounded-lg bg-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-slate-500"
	// 								placeholder="Enter your email"
	// 								required
	// 							/>
	// 						</div>
	// 						{/* Password Field */}
	// 						<div className="mb-4">
	// 							<label
	// 								htmlFor="password"
	// 								className="block text-lg text-white mb-2"
	// 							>
	// 								Password
	// 							</label>
	// 							<input
	// 								type="password"
	// 								id="password"
	// 								name="password"
	// 								className="w-full p-3 border-2 border-slate-600 rounded-lg bg-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-slate-500"
	// 								placeholder="Enter your password"
	// 								required
	// 							/>
	// 						</div>
	// 					</div>
	// 					{/* Error Message */}
	// 					{data?.message && (
	// 						<p className="text-red-500 text-sm mb-4">{data?.message}</p>
	// 					)}
	// 					{/* Submit Button */}
	// 					<button
	// 						type="submit"
	// 						disabled={isPending}
	// 						aria-disabled={isPending}
	// 						className="w-full p-3 bg-gradient-to-r from-slate-600 to-slate-500 text-white text-lg rounded-lg hover:from-slate-500 hover:to-slate-400 transition duration-300"
	// 					>
	// 						{isPending ? "Logging In..." : "Log In"}
	// 					</button>
	// 				</form>
	// 			</div>
	// 		</div>
	// 		<div className="hidden md:flex flex-row bg-slate-800 p-8 rounded-lg h-full shadow-lg w-full max-w-2xl">
	// 			<div>
	// 				<Image src={loginImage} alt="login image" />
	// 			</div>
	// 			<div className="w-full ">
	// 				<div className="flex justify-evenly">
	// 					<h2 className="text-3xl font-bold text-center text-white ">
	// 						Log In
	// 					</h2>
	// 				</div>
	// 				<form action={action} className="px-5">
	// 					<div className="flex flex-col">
	// 						{/* Email Field */}
	// 						<div className="mb-4">
	// 							<label
	// 								htmlFor="email"
	// 								className="block text-lg text-white mb-2"
	// 							>
	// 								Email
	// 							</label>
	// 							<input
	// 								type="email"
	// 								id="email"
	// 								name="email"
	// 								className="w-full p-3 border-2 border-slate-600 rounded-lg bg-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-slate-500"
	// 								placeholder="Enter your email"
	// 								required
	// 							/>
	// 						</div>
	// 						{/* Password Field */}
	// 						<div className="mb-4">
	// 							<label
	// 								htmlFor="password"
	// 								className="block text-lg text-white mb-2"
	// 							>
	// 								Password
	// 							</label>
	// 							<input
	// 								type="password"
	// 								id="password"
	// 								name="password"
	// 								className="w-full p-3 border-2 border-slate-600 rounded-lg bg-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-slate-500"
	// 								placeholder="Enter your password"
	// 								required
	// 							/>
	// 						</div>
	// 					</div>
	// 					{/* Error Message */}
	// 					{data?.message && (
	// 						<p className="text-red-500 text-sm mb-4">{data?.message}</p>
	// 					)}
	// 					{/* Submit Button */}
	// 					<button
	// 						type="submit"
	// 						disabled={isPending}
	// 						aria-disabled={isPending}
	// 						className="w-full p-3 bg-gradient-to-r from-slate-600 to-slate-500 text-white text-lg rounded-lg hover:from-slate-500 hover:to-slate-400 transition duration-300"
	// 					>
	// 						{isPending ? "Logging In..." : "Log In"}
	// 					</button>
	// 				</form>
	// 			</div>
	// 		</div>
	// 	</div>
	// );
}
