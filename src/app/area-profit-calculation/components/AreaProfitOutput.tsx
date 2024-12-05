import { AreaProfitSchema } from "@/mongoose-models/AreaProfit";

interface Props {
  dataGo?: AreaProfitSchema[]; // This prop can be undefined or an array
}

const AreaProfitOutput = ({ dataGo }: Props) => {
  // Provide a fallback if dataGo is undefined
  const areaProfits = dataGo ?? [];
  console.log(dataGo);

  return (
    <div className="m-4">
      {areaProfits.length > 0 ? (
        areaProfits.map((area, index) => {
          console.log(area);

          return (
            <div key={index} className="mb-4">
              <p>
                <strong>Name:</strong> {area.name}
              </p>
              {/* Add other properties of AreaProfitSchema here */}
              {/* <p><strong>Profit:</strong> {area.profit}</p> */}
            </div>
          );
        })
      ) : (
        <p>No area profits available.</p> // Fallback message if there are no area profits
      )}
    </div>
  );
};

export default AreaProfitOutput;
