// app/users/actions.ts
"use server";

import { revalidatePath } from "next/cache";
import dbConnect from "@/lib/mongoose";
import AreaProfit from "@/mongoose-models/AreaProfit";

export async function deleteBatch(id?: string) {
  try {
    // Connect to the database
    await dbConnect();
    console.log("id", id);

    // Find and delete the user by ID
    const result = await AreaProfit.findByIdAndDelete(id);

    if (!result) {
      throw new Error("Batch not found");
    }

    // Revalidate path to update the user list page
    revalidatePath("/area-profit-calculation");

    return {
      message: "Batch deleted successfully",
      id,
    };
  } catch (error) {
    console.error("Error deleting Batch:", error);

    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    return { message: "Failed to delete Batch", error: errorMessage };
  }
}
