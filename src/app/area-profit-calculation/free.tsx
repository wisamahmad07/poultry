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

import { useActionState } from "react";
import { submitAreaProfit } from "./action";
import { AreaProfitSchema } from "@/mongoose-models/AreaProfit";
import AreaProfitTable from "./components/AreaProfitTable"; 
import { deleteBatch } from "./deleteAction";
interface Props {
  initialData: AreaProfitSchema[] | undefined;
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

  function handleButtonClickData(name: string) {
    setName(name);
    console.log("Clicked AreaId NAME: ", name);
  }

  async function handleDeleteButton(_id: string) {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (confirmDelete) {
      const response = await deleteBatch(_id);
      if (response.message) {
        data.areaProfits =
          data.areaProfits?.filter(
            (area) => String(area._id) !== String(response.id)
          ) || null;
      }
    }
  }

  const foundAreaName =
    data.areaProfits?.find((area) => area.name === name) ||
    initialData?.find((area) => area.name === name);

  return (
    <>
      <Card className="w-[300px] mb-7 md:mb-0">
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
      <AreaProfitTable foundArea={foundAreaName} />
      <ScrollArea className="max-h-screen rounded-md border p-4">
        <h4 className="mb-4 text-sm font-medium leading-none">Batches</h4>
        {data?.areaProfits
          ? data?.areaProfits?.map((area, i) => (
              <React.Fragment key={i}>
                <div className="flex justify-between gap-2">
                  <Button
                    className="text-sm mr-3"
                    onClick={() => handleButtonClickData(area.name)}
                  >
                    {area.name}
                  </Button>
                  <Button
                    className="text-sm hover:text-red-700"
                    variant="outline"
                    onClick={() => handleDeleteButton(String(area._id))}
                  >
                    Delete
                  </Button>
                </div>
                <Separator className="my-2" />
              </React.Fragment>
            ))
          : initialData?.map((area, i) => (
              <React.Fragment key={i}>
                <div className="flex justify-between gap-2">
                  <Button
                    className="text-sm"
                    onClick={() => handleButtonClickData(area.name)}
                  >
                    {area.name}
                  </Button>
                  <Button
                    className="text-sm hover:text-red-700"
                    variant="outline"
                    onClick={() => handleDeleteButton(String(area._id))}
                  >
                    Delete
                  </Button>
                </div>
                <Separator className="my-2" />
              </React.Fragment>
            ))}
      </ScrollArea>
    </>
  );
};

export default AreaProfitForm;
