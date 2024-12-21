// app/actions.ts
"use server";

import dbConnect from "@/lib/mongoose";
import { z } from "zod";
import FeedStock, { FeedStockSchema } from "@/mongoose-models/FeedStock";

type State = {
  message: string | null;
  errors: string | null;
  feedStocks: FeedStockSchema[] | null;
};
export async function submitFeedStock(state: State, formData: FormData) {
  const feedStocks = await FeedStock.find({}).select(
    "-createdAt -updatedAt -__v"
  );

  const schema = z.object({
    name: z.string().min(1, "Name is required"),
    quantity: z.preprocess(
      (val) => parseFloat(val as string),
      z.number().positive()
    ),
  });
  // Parse and validate form data
  const result = schema.safeParse({
    name: formData.get("name"),
    quantity: formData.get("quantity"),
  });

  if (!result.success) {
    return {
      feedStocks: null,
      message: "Validation error",
      errors: result.error.issues[0].message,
    };
  }

  const { name, quantity } = result.data;

  const feedStocksToSend = feedStocks.map((feed) => ({
    _id: feed._id.toString(),
    name: feed.name,
    quantity: feed.quantity,
  })) as FeedStockSchema[];

  if (name === feedStocksToSend.find((feed) => feed.name === name)?.name)
    return {
      feedStocks: feedStocksToSend,
      message: null,
      errors: "Feed Stock already exists with this name",
    };

  try {
    // Connect to the database
    await dbConnect();

    // Create a new AreaProfit document
    const feedStock = new FeedStock({
      name,
      quantity,
    });

    // Save to database
    await feedStock.save();

    feedStocks.push(feedStock);

    const feedStocksToSend = feedStocks.map((feed) => ({
      _id: feed._id.toString(),
      name: feed.name,
      quantity: feed.quantity,
    })) as FeedStockSchema[];

    // Optionally, you can redirect or return a success message
    return {
      errors: null,
      message: "Feed Stock data submitted successfully",
      feedStocks: feedStocksToSend,
    }; // Replace with your success page route
  } catch (error) {
    if (error instanceof Error) {
      return {
        message: "Failed to submit Feed Stock data",
        errors: error.message,
        feedStocks: null,
      };
    }
  }
  return {
    message: null,
    errors: null,
    feedStocks: null,
  };
}
