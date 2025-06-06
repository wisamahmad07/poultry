import mongoose, { Schema, Model, Document, ObjectId } from "mongoose";

// Define TypeScript interface for the schema
export interface AreaProfitSchema extends Document {
  _id: string | ObjectId;
  name: string;
  chickenType: string;
  length: number;
  height: number;
  optimalNoOfChickens: number;
  days: number;
  optimalProfit: number;
  investment: number;
  flockPrice: number;
  medicinePrice: number;
  vaccinePrice: number;
}

// Define the schema using the AreaProfit interface
const AreaProfitSchema: Schema<AreaProfitSchema> = new Schema<AreaProfitSchema>(
  {
    name: { type: String, required: true },
    length: { type: Number, required: true },
    height: { type: Number, required: true },
    chickenType: { type: String, required: true },
    optimalNoOfChickens: { type: Number, required: true },
    days: { type: Number, required: true },
    optimalProfit: { type: Number, required: true },
    investment: { type: Number, required: true },
    flockPrice: { type: Number, required: true },
    medicinePrice: { type: Number, required: true },
    vaccinePrice: { type: Number, required: true },
  },
  { timestamps: true }
);

// Create a model based on the schema
const AreaProfit: Model<AreaProfitSchema> =
  mongoose.models.AreaProfit ||
  mongoose.model<AreaProfitSchema>("AreaProfit", AreaProfitSchema);

export default AreaProfit;
