// app/actions.ts
"use server";

import dbConnect from "@/lib/mongoose";
import FeedStock from "@/mongoose-models/FeedStock";
import { ObjectId } from "mongoose";
import { revalidatePath } from "next/dist/server/web/spec-extension/revalidate";
import { z } from "zod";

export async function updateUser(
  id: string | ObjectId,
  formData: FormData
): Promise<void> {
  const schema = z.object({
    name: z.string().min(1, "Name is required"),
    quantity: z.preprocess(
      (val) => parseFloat(val as string),
      z.number().positive()
    ),
  });
  console.log("oka ki report");

  const result = schema.safeParse({
    name: formData.get("name"),
    quantity: formData.get("quantity"),
  });

  if (!result.success) {
    console.error("Validation failed", result.error);
    throw new Error("Validation failed");
  }

  const { name, quantity } = result.data;

  try {
    await dbConnect();

    const existingFeed = await FeedStock.findById(id);
    if (!existingFeed) {
      console.error("Feed not found");
      throw new Error("Feed not found");
    }
    if (existingFeed.name !== name) {
      const feedWithSameName = await FeedStock.findOne({ name });
      if (feedWithSameName) {
        throw new Error(`Feed with name "${name}" already exists.`);
      }
    }

    await FeedStock.updateOne(
      { _id: id },
      {
        name,
        quantity,
      }
    );

    revalidatePath("/feed-management-stock-of-shed");
  } catch (error) {
    console.error("Failed to update Feed Stock", error);
  }
}
