import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RectangleEllipsis } from "lucide-react";

export function NewBatch() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <RectangleEllipsis />
          New Batch
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[300px] sm:max-w-[380px] md:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Batch</DialogTitle>
          <DialogDescription>
            Add Batch Details to start taking care of Batch.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-7 justify-start items-center  gap-4">
            <Label htmlFor="name" className="text-right  col-span-2">
              Batch Name
            </Label>
            <Input
              id="name"
              type="text"
              defaultValue="Broiler 1st flock"
              className="col-span-5"
            />
          </div>
          <div className="grid grid-cols-7  justify-start items-center gap-4">
            <Label htmlFor="chickenAmount" className="text-right  col-span-2">
              Chicken Amount
            </Label>
            <Input
              type="number"
              id="chickenAmount"
              defaultValue="500"
              className="col-span-5"
            />
          </div>
          <div className="grid grid-cols-7  justify-start items-center gap-4">
            <Label htmlFor="batchCost" className="text-right  col-span-2">
              Batch Cost
            </Label>
            <Input
              type="number"
              id="batchCost"
              defaultValue="500"
              className="col-span-5"
            />
          </div>
          <div className="grid grid-cols-7  justify-start items-center gap-4">
            <Label htmlFor="saleCost" className="text-right  col-span-2">
              One Piece Sale Cost
            </Label>
            <Input
              type="number"
              id="saleCost"
              defaultValue="500"
              className="col-span-5"
            />
          </div>
          <div className="grid grid-cols-7  justify-start items-center gap-4">
            <Label htmlFor="saleCost" className="text-right  col-span-2">
              Chicken Type
            </Label>
            <Select>
              <SelectTrigger className="w-[175px] sm:w-[230px] md:w-[265px]">
                <SelectValue placeholder="Select Chicken Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="Broiler">Broiler</SelectItem>
                  <SelectItem value="Layer">Layer</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Add Batch</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
