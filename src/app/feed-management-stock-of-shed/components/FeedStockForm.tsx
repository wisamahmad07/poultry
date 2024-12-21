"use client";
import React, { useActionState, useState } from "react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { FeedStockSchema } from "@/mongoose-models/FeedStock";
import { submitFeedStock } from "../action";
import { Button } from "@/components/ui/button";
import { deleteFeed } from "../deleteAction";
import FeedStockTable from "./FeedStockTable";
import Link from "next/link";

interface Props {
  initialData: FeedStockSchema[] | undefined;
}

const FeedStockForm = ({ initialData }: Props) => {
  const initialState = {
    message: null,
    errors: null,
    feedStocks: null,
  };
  const [name, setName] = useState<string>("");

  const [data, action, isPending] = useActionState(
    submitFeedStock,
    initialState
  );

  function handleButtonClickData(name: string) {
    setName(name);
    console.log("Clicked FeedId NAME: ", name);
  }

  async function handleDeleteButton(_id: string) {
    const response = await deleteFeed(_id);
    if (response.message) {
      data.feedStocks =
        data.feedStocks?.filter(
          (feed) => String(feed._id) !== String(response.id)
        ) || null;
    }
  }

  const foundFeedName =
    data.feedStocks?.find((area) => area.name === name) ||
    initialData?.find((area) => area.name === name);

  return (
    <>
      <Card className="w-[300px] mb-7 md:mb-0">
        <CardHeader>
          <CardTitle className="text-center">Manage Feed Stock</CardTitle>
          <CardDescription>
            Manage all type of feed you have in your shed to remember what type
            of feed and how much quantity you have in your shed
          </CardDescription>
        </CardHeader>
        <CardContent className="py-0">
          <form action={action}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Name of Feed</Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Enter a unique Feed name (Medicine)"
                  required
                />
              </div>

              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="quantity">Quantity in packets or kgs</Label>
                <Input
                  id="quantity"
                  name="quantity"
                  type="number"
                  placeholder="Enter quantity"
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
      <FeedStockTable foundFeed={foundFeedName} />
      <ScrollArea className="max-h-screen rounded-md border p-4">
        <h4 className="mb-4 text-sm font-medium leading-none">Feeds</h4>
        {data?.feedStocks
          ? data?.feedStocks?.map((feed, i) => (
              <React.Fragment key={i}>
                <div className="flex justify-between gap-2">
                  <Button
                    className="text-sm mr-3"
                    onClick={() => handleButtonClickData(feed.name)}
                  >
                    {feed.name}
                  </Button>
                  {/* Edit */}
                  <div>
                    <Button asChild variant="primary" className="mr-1">
                      <Link
                        href={`/feed-management-stock-of-shed/edits/${feed._id}`}
                      >
                        Edit
                      </Link>
                    </Button>
                    {/* Delete */}
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="destructive">Delete</Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                          <DialogTitle>Delete Feed Stock</DialogTitle>
                          <DialogDescription>
                            This action cannot be undone. Do you really want to
                            delete this Idea?
                          </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                          <DialogClose asChild>
                            <Button
                              variant="destructive"
                              onClick={() =>
                                handleDeleteButton(String(feed._id))
                              }
                            >
                              Delete
                            </Button>
                          </DialogClose>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
                <Separator className="my-2" />
              </React.Fragment>
            ))
          : initialData?.map((feed, i) => (
              <React.Fragment key={i}>
                <div className="flex justify-between gap-2">
                  <Button
                    className="text-sm"
                    onClick={() => handleButtonClickData(feed.name)}
                  >
                    {feed.name}
                  </Button>
                  {/* Edit */}
                  <div>
                    <Button asChild variant="primary" className="mr-1">
                      <Link
                        href={`/feed-management-stock-of-shed/edits/${feed._id}`}
                      >
                        Edit
                      </Link>
                    </Button>
                    {/* Delete */}
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="destructive">Delete</Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                          <DialogTitle>Delete Feed Stock</DialogTitle>
                          <DialogDescription>
                            This action cannot be undone. Do you really want to
                            delete this Idea?
                          </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                          <DialogClose asChild>
                            <Button
                              variant="destructive"
                              onClick={() =>
                                handleDeleteButton(String(feed._id))
                              }
                            >
                              Delete
                            </Button>
                          </DialogClose>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
                <Separator className="my-2" />
              </React.Fragment>
            ))}
      </ScrollArea>
    </>
  );
};

export default FeedStockForm;
