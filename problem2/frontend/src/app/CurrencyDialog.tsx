import React from "react";
import Image from "next/image";
import {
  Dialog,
  List,
  ListItem,
  ListItemPrefix,
} from "./materialTailwind";
import { Currency } from "./currrency";

type CurrencyDialogProps = {
  selectedPay: boolean;
  open: boolean;
  handleOpen: () => void;
  handleSelectCurrency: (currency: Currency) => void;
  payCurrency: Currency;
  receiveCurrency: Currency;
};

function checkSelectedCurrency(isPay: boolean, currency: Currency, payCurrency: Currency, receiveCurrency: Currency): boolean {
  if (isPay) {
    return currency === payCurrency;
  }
  return currency === receiveCurrency;

}

const CurrencyDialog: React.FC<CurrencyDialogProps> = ({
  selectedPay,
  open,
  handleOpen,
  handleSelectCurrency,
  payCurrency,
  receiveCurrency,
}) => {
  return (
    <Dialog className="overflow-y-scroll h-3/4" size="xs" open={open} handler={handleOpen}>
      <List className="w-full my-2 p-2">
        {Object.values(Currency).map((currency) => (
          <ListItem
            key={currency}
            className={`group rounded-none py-1.5 px-3 text-sm font-normal text-blue-gray-700 hover:bg-blue-300 hover:text-white focus:bg-blue-300 focus:text-white ${checkSelectedCurrency(selectedPay, currency, payCurrency, receiveCurrency) ? "bg-blue-500 text-white" : ""}`}
            onClick={() => handleSelectCurrency(currency)}
          >
            <ListItemPrefix className="relative w-6 h-6">
              <Image
                src={`/tokens/${currency}.svg`}
                alt={currency}
                fill={true}
              />
            </ListItemPrefix>
            {currency}
          </ListItem>
        ))}
      </List>
    </Dialog>
  );
};
export default CurrencyDialog;
