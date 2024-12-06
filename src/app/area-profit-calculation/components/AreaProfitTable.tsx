import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { AreaProfitSchema } from "@/mongoose-models/AreaProfit";

interface Props {
  foundArea?: AreaProfitSchema | undefined;
}
const AreaProfitTable = ({ foundArea }: Props) => {
  return (
    <Table className="mb-7 md:mb-0 border ">
      <TableCaption>
        {!foundArea ? (
          "Kindly Select any Batch For detail"
        ) : (
          <>
            Detail of <b className="text-black"> {foundArea?.name}</b> Batch
          </>
        )}
      </TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="font-bold text-black">Name</TableHead>
          <TableHead className="font-bold text-black">Values</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {foundArea ? (
          <>
            <TableRow>
              <TableCell className="font-medium">Name</TableCell>
              <TableCell>{foundArea.name}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Chicken Type</TableCell>
              <TableCell>{foundArea.chickenType}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Length</TableCell>
              <TableCell>{foundArea.length}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Height</TableCell>
              <TableCell>{foundArea.height}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">
                Optimal No. of Chickens
              </TableCell>
              <TableCell>{foundArea.optimalNoOfChickens}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Days</TableCell>
              <TableCell>{foundArea.days}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Optimal Profit</TableCell>
              <TableCell>${foundArea.optimalProfit.toFixed(2)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Investment</TableCell>
              <TableCell>${foundArea.investment.toFixed(2)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Flock Price</TableCell>
              <TableCell>${foundArea.flockPrice.toFixed(2)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Medicine Price</TableCell>
              <TableCell>${foundArea.medicinePrice.toFixed(2)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Vaccine Price</TableCell>
              <TableCell>${foundArea.vaccinePrice.toFixed(2)}</TableCell>
            </TableRow>
          </>
        ) : (
          ""
        )}
      </TableBody>
      {foundArea && (
        <TableFooter>
          <TableRow>
            <TableCell colSpan={1} className="font-bold">
              Total Investment
            </TableCell>
            <TableCell className="text-right font-bold">
              $
              {(
                foundArea.investment +
                foundArea.medicinePrice +
                foundArea.vaccinePrice
              ).toFixed(2)}
            </TableCell>
          </TableRow>
        </TableFooter>
      )}
    </Table>
  );
};

export default AreaProfitTable;
