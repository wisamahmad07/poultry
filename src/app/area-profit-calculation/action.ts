// app/actions.ts
"use server";

import dbConnect from "@/lib/mongoose";
import AreaProfit, { AreaProfitSchema } from "@/mongoose-models/AreaProfit";
import { z } from "zod";

export async function submitAreaProfit(prevState: unknown, formData: FormData) {
  const areaProfits: AreaProfitSchema[] = await AreaProfit.find({}).select(
    "-_id -createdAt -updatedAt -__v"
  );

  console.log(areaProfits);

  // Define schema for validation
  const schema = z.object({
    name: z.string().nonempty("Name is required"),
    length: z.preprocess(
      (val) => parseFloat(val as string),
      z.number().positive()
    ),
    height: z.preprocess(
      (val) => parseFloat(val as string),
      z.number().positive()
    ),
    chickenType: z.string().nonempty("Chicken type is required"),
    flockPrice: z.preprocess(
      (val) => parseFloat(val as string),
      z.number().nonnegative()
    ),
    medicinePrice: z.preprocess(
      (val) => parseFloat(val as string),
      z.number().nonnegative()
    ),
    vaccinePrice: z.preprocess(
      (val) => parseFloat(val as string),
      z.number().nonnegative()
    ),
  });

  // Parse and validate form data
  const result = schema.safeParse({
    name: formData.get("name"),
    length: formData.get("length"),
    height: formData.get("height"),
    chickenType: formData.get("chickenType"),
    flockPrice: formData.get("flockPrice"),
    medicinePrice: formData.get("medicinePrice"),
    vaccinePrice: formData.get("vaccinePrice"),
  });

  if (!result.success) {
    return {
      message: "Validation error",
      errors: result.error.flatten(),
    };
  }

  const {
    name,
    length,
    height,
    chickenType,
    flockPrice,
    medicinePrice,
    vaccinePrice,
  } = result.data;

  try {
    // Connect to the database
    await dbConnect();

    // Calculate additional fields
    const area = length * height; // Total area in square meters
    const optimalNoOfChickens = Math.floor(area * 2); // Assuming 2 chickens per square meter
    const days = 35; // Example grow-out period
    const investment = flockPrice + medicinePrice + vaccinePrice;
    const optimalProfit = optimalNoOfChickens * 5 - investment; // Example profit calculation

    // Create a new AreaProfit document
    const areaProfit = new AreaProfit({
      name,
      length,
      height,
      chickenType,
      optimalNoOfChickens,
      days,
      optimalProfit,
      investment,
      flockPrice,
      medicinePrice,
      vaccinePrice,
    });

    // Save to database
    await areaProfit.save();

    areaProfits.push(areaProfit);
    console.log(JSON.stringify(areaProfits, null, 2));

    // Optionally, you can redirect or return a success message
    return { message: "Area profit data submitted successfully", areaProfits }; // Replace with your success page route
  } catch (error) {
    console.error(error);
    return { message: "Failed to submit area profit data", errors: { error } };
  }
}
