import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FeedStockSchema } from "@/mongoose-models/FeedStock";

interface Props {
  foundFeed?: FeedStockSchema | undefined;
}
const FeedStockTable = ({ foundFeed }: Props) => {
  return (
    <Table className="mb-7 md:mb-0 border">
      <TableCaption>
        {!foundFeed ? (
          "Kindly Select any Feed For detail"
        ) : (
          <>
            Detail of <b> {foundFeed?.name}</b> Batch
          </>
        )}
      </TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="font-bold ">Name</TableHead>
          <TableHead className="font-bold ">Values</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {foundFeed ? (
          <>
            <TableRow>
              <TableCell className="font-medium">Name</TableCell>
              <TableCell>{foundFeed.name}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Quantity</TableCell>
              <TableCell>{foundFeed.quantity}</TableCell>
            </TableRow>
          </>
        ) : (
          ""
        )}
      </TableBody>
    </Table>
  );
};

export default FeedStockTable;
