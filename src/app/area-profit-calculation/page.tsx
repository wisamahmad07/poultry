import AreaProfit, { AreaProfitSchema } from "@/mongoose-models/AreaProfit";
import AreaProfitForm from "./components/AreaProfitForm";

const Page = async () => {
  const areaProfits = await AreaProfit.find({}).select(
    "-createdAt -updatedAt -__v"
  );
  const areaProfitsToSend = areaProfits
    .map((area) => {
      if (!area._id.toString()) {
        console.error("Missing _id for area:", area);
        return null;
      }
      return {
        _id: area._id.toString(),
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
      };
    })
    .filter((area) => area !== null) as AreaProfitSchema[];

  return (
    <div className="md:flex justify-between m-4">
      <AreaProfitForm initialData={areaProfitsToSend} />
    </div>
  );
};

export default Page;
