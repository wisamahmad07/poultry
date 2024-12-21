import FeedStock, { FeedStockSchema } from "@/mongoose-models/FeedStock";
import FeedStockForm from "./components/FeedStockForm";

const Page = async () => {
  const feedStocks = await FeedStock.find({}).select(
    "-createdAt -updatedAt -__v"
  );
  const feedStocksToSend = feedStocks
    .map((feed) => {
      if (!feed._id.toString()) {
        console.error("Missing _id for feed:", feed);
        return null;
      }
      return {
        _id: feed._id.toString(),
        name: feed.name,
        quantity: feed.quantity,
      };
    })
    .filter((feed) => feed !== null) as FeedStockSchema[];

  return (
    <div className="md:flex justify-between m-4">
      <FeedStockForm initialData={feedStocksToSend} />
    </div>
  );
};

export default Page;
