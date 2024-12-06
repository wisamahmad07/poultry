import AreaProfit, { AreaProfitSchema } from "@/mongoose-models/AreaProfit";
import AreaProfitForm from "./components/AreaProfitForm";

const Page = async () => {
  const areaProfits = await AreaProfit.find({}).select(
    "-_id -createdAt -updatedAt -__v"
  );
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

  return (
    <div className="flex-col md:flex justify-between m-4">
      <AreaProfitForm initialData={areaProfitsToSend} />
    </div>
  );
};

export default Page;
