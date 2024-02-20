"use client";

import React from "react";
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  Card,
  Typography,
} from "./materialTailwind";
import { DropdownIcon } from "./DropdownIcon";

type TransactionDetailsProps = {};

const mockTransactionDetails = [
  { key: "Price impact", value: "~0.01%" },
  { key: "Max. slippage", value: "5%" },
  { key: "Fee", value: "$0" },
  { key: "Network cost", value: "$13.00" },
  { key: "Order routing", value: "Uniswap API" },
];

function TransactionTable() {
  return (
    <Card className="h-full w-full">
      <table className="w-full min-w-max table-auto text-left">
        <tbody>
          {mockTransactionDetails.map(({ key, value }) => (
            <tr key={key}>
              <td className="p-2">
                <Typography
                  variant="small"
                  color="gray"
                  className="font-normal"
                >
                  {key}
                </Typography>
              </td>
              <td className="p-2 text-end">
                <Typography variant="small" color="black" className="font-bold">
                  {value}
                </Typography>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
}

const TransactionDetails: React.FC<TransactionDetailsProps> = () => {
  const [open, setOpen] = React.useState(0);

  const handleOpen = (value: number) => setOpen(open === value ? 0 : value);
  return (
    <>
      <Accordion open={open === 1} icon={<DropdownIcon id={1} open={open} />}>
        <AccordionHeader onClick={() => handleOpen(1)}>
          More Details
        </AccordionHeader>
        <AccordionBody>
          <TransactionTable />
        </AccordionBody>
      </Accordion>
    </>
  );
};
export default TransactionDetails;
