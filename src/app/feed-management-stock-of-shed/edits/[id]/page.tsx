import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { updateUser } from "./editAction";
import FeedStock from "@/mongoose-models/FeedStock";
import dbConnect from "@/lib/mongoose";
import { redirect } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface Params {
  id: string;
}

export default async function FeedStockEditForm({
  params,
}: {
  params: Promise<Params>;
}) {
  const { id } = await params;

  await dbConnect();

  const feedStock = await FeedStock.findById(id);

  return (
    <Dialog defaultOpen>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Feed Stock</DialogTitle>
          <DialogDescription>
            Make changes to your Feed Stock here. Click Update when you are
            done.
          </DialogDescription>
        </DialogHeader>
        <form
          action={async function (formData: FormData) {
            "use server";
            await updateUser(id, formData);
            console.log("ok done g");
            redirect("/feed-management-stock-of-shed");
          }}
          className="p-5"
        >
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-7 justify-start items-center  gap-4">
              <Label htmlFor="name" className="text-right  col-span-2">
                Name
              </Label>
              <Input
                id="name"
                type="text"
                name="name"
                defaultValue={feedStock?.name || ""}
                className="col-span-5"
              />
            </div>
            <div className="grid grid-cols-7  justify-start items-center gap-4">
              <Label htmlFor="quantity" className="text-right  col-span-2">
                Quantity
              </Label>
              <Input
                type="number"
                id="quantity"
                name="quantity"
                defaultValue={feedStock?.quantity || 0}
                className="col-span-5"
              />
            </div>
            <Button type="submit">Update</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
