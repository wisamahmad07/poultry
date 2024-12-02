import * as React from "react";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import AreaProfit, { AreaProfitSchema } from "@/mongoose-models/AreaProfit";
import { Button } from "@/components/ui/button";

export default async function ShowAllOutput() {
  const areaProfit: AreaProfitSchema[] = await AreaProfit.find({});

  return (
    <ScrollArea className="max-h-screen w-48 rounded-md border m-4">
      <div className="p-4">
        <h4 className="mb-4 text-sm font-medium leading-none">Tags</h4>
        {areaProfit.map((area, index) => (
          <>
            <Button key={index} className="text-sm">
              {area.chickenType}
            </Button>
            <Separator className="my-2" />
          </>
        ))}
      </div>
    </ScrollArea>
  );
}
