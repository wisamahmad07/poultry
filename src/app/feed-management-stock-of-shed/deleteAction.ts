// app/users/actions.ts
"use server";

import { revalidatePath } from "next/cache";
import dbConnect from "@/lib/mongoose";
import FeedStock from "@/mongoose-models/FeedStock";

export async function deleteFeed(id?: string) {
  try {
    // Connect to the database
    await dbConnect();
    console.log("id", id);

    // Find and delete the user by ID
    const result = await FeedStock.findByIdAndDelete(id);

    if (!result) {
      throw new Error("Feed not found");
    }

    // Revalidate path to update the user list page
    revalidatePath("/feed-management-stock-of-shed");

    return {
      message: "Feed deleted successfully",
      id,
    };
  } catch (error) {
    console.error("Error deleting Feed:", error);

    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    return { message: "Failed to delete Feed", error: errorMessage };
  }
}
