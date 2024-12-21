import mongoose, { Schema, Model, Document, ObjectId } from "mongoose";

// Define TypeScript interface for the schema
export interface FeedStockSchema extends Document {
  _id: string | ObjectId;
  name: string;
  quantity: number;
}

// Define the schema using the FeedStock interface
const FeedStockSchema: Schema<FeedStockSchema> = new Schema<FeedStockSchema>(
  {
    name: { type: String, required: true },
    quantity: { type: Number, required: true },
  },
  { timestamps: true }
);

// Create a model based on the schema
const FeedStock: Model<FeedStockSchema> =
  mongoose.models.FeedStock ||
  mongoose.model<FeedStockSchema>("FeedStock", FeedStockSchema);

export default FeedStock;
