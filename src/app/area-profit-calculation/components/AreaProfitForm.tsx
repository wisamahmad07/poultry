"use client";
import React, { useState } from "react";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
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
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useActionState } from "react";
import { submitAreaProfit } from "../action";
import { AreaProfitSchema } from "@/mongoose-models/AreaProfit";
interface Props {
  initialData: AreaProfitSchema[];
}
const AreaProfitForm = ({ initialData }: Props) => {
  const initialState = {
    message: null,
    errors: null,
    areaProfits: null,
  };
  const [name, setName] = useState<string>("");

  const [data, action, isPending] = useActionState(
    submitAreaProfit,
    initialState
  );

  function handleButtonClick1(name: string) {
    setName(name);
    console.log("Clicked AreaId data: ", name);
  }
  function handleButtonClick2(name: string) {
    setName(name);
    console.log("Clicked AreaId Mongo: ", name);
  }
  const foundAreaName = initialData.find((area) => area.name === name);

  return (
    <>
      <Card className="w-[350px] mb-7">
        <CardHeader>
          <CardTitle className="text-center">
            Calculate Profit with Area
          </CardTitle>
          <CardDescription>
            Calculate what investment and preparation you need in order to start
            your own poultry farm
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
                  placeholder="Enter a unique name (Broiler Dec-24)"
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
      <Table className="mb-7">
        <TableCaption>
          {!foundAreaName
            ? "Kindly Select any Batch For detail"
            : `Detail of ${foundAreaName?.name} Batch`}
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Field</TableHead>
            <TableHead>Value</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {foundAreaName ? (
            <>
              <TableRow>
                <TableCell className="font-medium">Name</TableCell>
                <TableCell>{foundAreaName.name}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Chicken Type</TableCell>
                <TableCell>{foundAreaName.chickenType}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Length</TableCell>
                <TableCell>{foundAreaName.length}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Height</TableCell>
                <TableCell>{foundAreaName.height}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">
                  Optimal No. of Chickens
                </TableCell>
                <TableCell>{foundAreaName.optimalNoOfChickens}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Days</TableCell>
                <TableCell>{foundAreaName.days}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Optimal Profit</TableCell>
                <TableCell>${foundAreaName.optimalProfit.toFixed(2)}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Investment</TableCell>
                <TableCell>${foundAreaName.investment.toFixed(2)}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Flock Price</TableCell>
                <TableCell>${foundAreaName.flockPrice.toFixed(2)}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Medicine Price</TableCell>
                <TableCell>${foundAreaName.medicinePrice.toFixed(2)}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Vaccine Price</TableCell>
                <TableCell>${foundAreaName.vaccinePrice.toFixed(2)}</TableCell>
              </TableRow>
            </>
          ) : (
            ""
          )}
        </TableBody>
        {foundAreaName && (
          <TableFooter>
            <TableRow>
              <TableCell colSpan={1} className="font-bold">
                Total Investment
              </TableCell>
              <TableCell className="text-right font-bold">
                $
                {(
                  foundAreaName.investment +
                  foundAreaName.medicinePrice +
                  foundAreaName.vaccinePrice
                ).toFixed(2)}
              </TableCell>
            </TableRow>
          </TableFooter>
        )}
      </Table>
      <ScrollArea className="max-h-screen rounded-md border p-4">
        <h4 className="mb-4 text-sm font-medium leading-none">Batches</h4>
        {data?.areaProfits
          ? data?.areaProfits?.map((area) => (
              <React.Fragment key={String(area._id)}>
                <Button
                  className="text-sm"
                  onClick={() => handleButtonClick1(area.name)}
                >
                  {area.name}
                </Button>
                <Separator className="my-2" />
              </React.Fragment>
            ))
          : initialData?.map((area, i) => (
              <React.Fragment key={i}>
                <Button
                  className="text-sm"
                  onClick={() => handleButtonClick2(area.name)}
                >
                  {area.name}
                </Button>
                <Separator className="my-2" />
              </React.Fragment>
            ))}
      </ScrollArea>
    </>
  );
};

export default AreaProfitForm;
