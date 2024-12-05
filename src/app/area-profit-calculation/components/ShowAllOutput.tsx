import * as React from "react";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import AreaProfit, { AreaProfitSchema } from "@/mongoose-models/AreaProfit";

export default async function ShowAllOutput() {
	const areaProfits = await AreaProfit.find({})
		.select("-_id -createdAt -updatedAt") // Exclude `createdAt` and `updatedAt`
		.lean();

	return (
		<ScrollArea className="max-h-screen w-48 rounded-md border m-4">
			<div className="p-4">
				<h4 className="mb-4 text-sm font-medium leading-none">Tags</h4>
				{areaProfits.map((area, i) => (
					<React.Fragment key={i}>
						<Button className="text-sm">{area.name}</Button>
						<Separator className="my-2" />
					</React.Fragment>
				))}
			</div>
		</ScrollArea>
	);
}
