// app/actions.ts
"use server";

import dbConnect from "@/lib/mongoose";
import AreaProfit, { AreaProfitSchema } from "@/mongoose-models/AreaProfit";
import { z } from "zod";

type State = {
  message: string | null;
  errors: string | null;
  areaProfits: AreaProfitSchema[] | null;
};
export async function submitAreaProfit(state: State, formData: FormData) {
  const areaProfits = await AreaProfit.find({}).select(
    "-_id -createdAt -updatedAt -__v"
  );

  const schema = z.object({
    name: z.string().min(1, "Name is required"),
    chickenType: z.string().min(1, "Chicken type is required"),
    length: z.preprocess(
      (val) => parseFloat(val as string),
      z.number().positive()
    ),
    height: z.preprocess(
      (val) => parseFloat(val as string),
      z.number().positive()
    ),
    flockPrice: z.preprocess(
      (val) => parseFloat(val as string),
      z.number().positive()
    ),
    medicinePrice: z.preprocess(
      (val) => parseFloat(val as string),
      z.number().positive()
    ),
    vaccinePrice: z.preprocess(
      (val) => parseFloat(val as string),
      z.number().positive()
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
      areaProfits: null,
      message: "Validation error",
      errors: result.error.issues[0].message,
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

  const areaProfitsToSend = areaProfits.map((area) => ({
    _id: String(area._id),
    name: area.name,
    length: area.length,
    height: area.height,
    chickenType: area.chickenType,
    optimalNoOfChickens: area.optimalNoOfChickens,
    days: area.days,
    optimalProfit: area.optimalProfit,
    investment: area.investment,
    flockPrice: area.flockPrice,
    medicinePrice: area.medicinePrice,
    vaccinePrice: area.vaccinePrice,
  })) as AreaProfitSchema[];

  if (name === areaProfitsToSend.find((area) => area.name === name)?.name)
    return {
      areaProfits: areaProfitsToSend,
      message: null,
      errors: "Batch with this name already exists",
    };

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

    const areaProfitsToSend = areaProfits.map((area) => ({
      _id: String(area._id),
      name: area.name,
      length: area.length,
      height: area.height,
      chickenType: area.chickenType,
      optimalNoOfChickens: area.optimalNoOfChickens,
      days: area.days,
      optimalProfit: area.optimalProfit,
      investment: area.investment,
      flockPrice: area.flockPrice,
      medicinePrice: area.medicinePrice,
      vaccinePrice: area.vaccinePrice,
    })) as AreaProfitSchema[];

    // Optionally, you can redirect or return a success message
    return {
      errors: null,
      message: "Area profit data submitted successfully",
      areaProfits: areaProfitsToSend,
    }; // Replace with your success page route
  } catch (error) {
    if (error instanceof Error) {
      return {
        message: "Failed to submit area profit data",
        errors: error.message,
        areaProfits: null,
      };
    }
  }
  return {
    message: null,
    errors: null,
    areaProfits: null,
  };
}
