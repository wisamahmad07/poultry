"use client";
import React from "react";

import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { useActionState } from "react";
import { submitAreaProfit } from "../action";

const AreaProfitForm = () => {
	const initialState = {
		message: null,
		errors: null,
		areaProfits: null,
	};
	const [data, action, isPending] = useActionState(
		submitAreaProfit,
		initialState,
	);

	return (
		<>
			<div className="flex">
				<Card className="w-[350px] m-4 ">
					<CardHeader>
						<CardTitle className="text-center">
							Calculate Profit with Area
						</CardTitle>
						<CardDescription>
							Calculate what investment and preparation you need in order to
							start your own poultry farm
						</CardDescription>
					</CardHeader>
					<CardContent className="py-0">
						<form action={action}>
							<div className="grid w-full items-center gap-4">
								{/* Length Input */}
								<div className="flex flex-col space-y-1.5">
									<Label htmlFor="name">Name of Batch</Label>
									<Input
										id="name"
										name="name"
										type="text"
										placeholder="Enter name (Broiler Dec-24)"
										required
									/>
								</div>
								{/* Length Input */}
								<div className="flex flex-col space-y-1.5">
									<Label htmlFor="length">Length (in meters)</Label>
									<Input
										id="length"
										name="length"
										type="number"
										placeholder="Enter length"
										required
									/>
								</div>
								{/* Height Input */}
								<div className="flex flex-col space-y-1.5">
									<Label htmlFor="height">Height (in meters)</Label>
									<Input
										id="height"
										name="height"
										type="number"
										placeholder="Enter height"
										required
									/>
								</div>
								{/* Chicken Type Select */}
								<div className="flex flex-col space-y-1.5">
									<Label htmlFor="chickenType">Chicken Type</Label>
									<Select name="chickenType" required>
										<SelectTrigger id="chickenType">
											<SelectValue placeholder="Select chicken type" />
										</SelectTrigger>
										<SelectContent position="popper">
											<SelectItem value="broiler">Broiler</SelectItem>
											<SelectItem value="layer">Layer</SelectItem>
											{/* Add more chicken types if needed */}
										</SelectContent>
									</Select>
								</div>
								{/* Flock Price */}
								<div className="flex flex-col space-y-1.5">
									<Label htmlFor="flockPrice">Flock Price</Label>
									<Input
										id="flockPrice"
										name="flockPrice"
										type="number"
										placeholder="Enter flock price"
										required
									/>
								</div>
								{/* Medicine Price */}
								<div className="flex flex-col space-y-1.5">
									<Label htmlFor="medicinePrice">Medicine Price</Label>
									<Input
										id="medicinePrice"
										name="medicinePrice"
										type="number"
										placeholder="Enter medicine price"
										required
									/>
								</div>
								{/* Vaccine Price */}
								<div className="flex flex-col space-y-1.5">
									<Label htmlFor="vaccinePrice">Vaccine Price</Label>
									<Input
										id="vaccinePrice"
										name="vaccinePrice"
										type="number"
										placeholder="Enter vaccine price"
										required
									/>
								</div>
								{data?.message && (
									<p className="text-green-500 text-sm mb-4">{data?.message}</p>
								)}
								{data?.errors && (
									<p className="text-red-500 text-sm mb-4">{data?.errors}</p>
								)}
								{data?.areaProfits?.map((area, index) => {
									console.log(area);

									return (
										<div key={index} className="mb-4">
											<p>
												<strong>Name:</strong> {area.name}
											</p>
											{/* Add other properties of AreaProfitSchema here */}
											{/* <p><strong>Profit:</strong> {area.profit}</p> */}
										</div>
									);
								})}
								<CardFooter className="flex justify-end">
									<Button
										type="submit"
										disabled={isPending}
										aria-disabled={isPending}
									>
										{isPending ? "Submitting..." : "Submit"}
									</Button>
								</CardFooter>
							</div>
						</form>
					</CardContent>
				</Card>
			</div>
		</>
	);
};

export default AreaProfitForm;
