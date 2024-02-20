"use client";

import React, { useEffect, useState } from "react";
import { Input, Button, Typography, Alert } from "./materialTailwind";
import { DropdownIcon } from "./DropdownIcon";
import { Currency } from "./currrency";
import CurrencyDialog from "./CurrencyDialog";
import Image from "next/image";
import { getCurrencyPrice } from "./getPrice";

type SwapInterfaceProps = {};

const SwapInterface: React.FC<SwapInterfaceProps> = () => {
  const [payAmount, setPayAmount] = useState<number | undefined>(undefined);
  const [receiveAmount, setReceiveAmount] = useState<number | undefined>(
    undefined
  );
  const [payCurrencyPrice, setPayCurrencyPrice] = useState<number>(1645.94);
  const [receiveCurrencyPrice, setReceiveCurrencyPrice] = useState<number>(36.35);
  const [payCurrencyPriceTotal, setPayCurrencyPriceTotal] = useState<number>(0);
  const [receiveCurrencyPriceTotal, setReceiveCurrencyPriceTotal] = useState<number>(0);
  const [payCurrency, setPayCurrency] = useState<Currency>(Currency.ETH);
  const [receiveCurrency, setReceiveCurrency] = useState<Currency>(
    Currency.GMX
  );
  const [openCurrencyDialog, setOpenCurrencyDialog] = useState<boolean>(false);
  const [selectedPay, setSelectedPay] = useState<boolean>(true);
  const [showAlert, setShowAlert] = useState<boolean>(false);

  const priceFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  useEffect(() => {
    fetchPrice();
  }, [payCurrency, receiveCurrency]);

  useEffect(() => {
    if (payAmount !== undefined && payAmount === 0) {
      setReceiveAmount(0);
      setPayCurrencyPriceTotal(0);
      setReceiveCurrencyPriceTotal(0);
    }
    if (payAmount !== undefined && payAmount !== 0 && payCurrencyPrice !== 0 && receiveCurrencyPrice !== 0) {
      setPayCurrencyPriceTotal(roundPrice((payAmount * payCurrencyPrice)));
      setReceiveAmount(roundPrice((payAmount * payCurrencyPrice) / receiveCurrencyPrice));
      if (receiveAmount !== undefined && receiveAmount !== 0) {
        setReceiveCurrencyPriceTotal(roundPrice(receiveAmount * receiveCurrencyPrice));
      }
    }
  }, [payAmount, receiveAmount, payCurrencyPrice, receiveCurrencyPrice]);

  function roundPrice(num: number): number {
    return Number((Math.round((num) * 100) / 100).toFixed(2));
  }

  async function fetchPrice() {
    try {
      if (selectedPay) {
        const data = await getCurrencyPrice(payCurrency);
        setPayCurrencyPrice(roundPrice(data.price));
      } else if (!selectedPay) {
        const data = await getCurrencyPrice(receiveCurrency);
        setReceiveCurrencyPrice(roundPrice(data.price));
      }
    } catch (error) {
      console.error(error);
      // If is null error, set to 0
      if (selectedPay) {
        setPayCurrencyPrice(0);
      } else {
        setReceiveCurrencyPrice(0);
      }
      setShowAlert(true);
    }
  }


  function handleOpenCurrencyDialog(isPay: boolean): void {
    setSelectedPay(isPay);
    setOpenCurrencyDialog(true);
  }

  function handleSelectCurrency(currency: Currency): void {
    if (selectedPay) {
      setPayCurrency(currency);
    } else {
      setReceiveCurrency(currency);
    }
    setOpenCurrencyDialog(false);
  }

  function inputValidation(event: React.KeyboardEvent<HTMLInputElement>): void {
    if (!/\d/.test(event.key)) {
      event.preventDefault();
    }
  }

  function blockInput(event: React.KeyboardEvent<HTMLInputElement>): void {
    event.preventDefault();
  }


  function handlePayAmountChange(
    event: React.ChangeEvent<HTMLInputElement>
  ): void {
    setPayAmount(Number(event.target.value));
  }

  function handleReceiveAmountChange(
    event: React.ChangeEvent<HTMLInputElement>
  ): void {
    setReceiveAmount(Number(event.target.value));
  }

  return (
    <div className="mt-2 flex flex-col w-full gap-8">
      {showAlert && (
        <Alert
          open={showAlert}
          onClose={() => setShowAlert(false)}
          color="red"
          className="border-red bg-red-500 font-medium text-gray-100"
        >
          Unable to fetch price
        </Alert>
      )}
      <div className="flex gap-5">
        <div className="flex w-full flex-col gap-2">
          <Input
            variant="static"
            label="You pay"
            placeholder="0"
            crossOrigin=""
            value={payAmount}
            onKeyPress={inputValidation}
            onChange={handlePayAmountChange}
          />
          <Typography className="text-sm text-blue-gray-500">
            {priceFormatter.format(payCurrencyPriceTotal)}
          </Typography>
        </div>

        <Button
          className="flex w-1/2 justify-center items-center align-middle gap-2 relative"
          variant="filled"
          color="white"
          ripple={false}
          onClick={() => handleOpenCurrencyDialog(true)}
        >
          <div className="h-8 w-8 relative">
            <Image
              objectFit="cover"
              src={`/tokens/${payCurrency}.svg`}
              alt={payCurrency}
              fill={true}
            />
          </div>
          <Typography>
            {payCurrency}
          </Typography>
          <DropdownIcon id={1} open={0} />
        </Button>
      </div>
      <div className="flex gap-5">
        <div className="flex w-full flex-col gap-2">
          <Input
            variant="static"
            label="You receive"
            placeholder="0"
            crossOrigin=""
            value={receiveAmount}
            onKeyPress={blockInput}
            onChange={() => handleReceiveAmountChange}
          />
          <Typography className="text-sm text-blue-gray-500">
            {priceFormatter.format(receiveCurrencyPriceTotal)}
          </Typography>
        </div>

        <Button
          className="flex w-1/2 justify-center items-center align-middle gap-2 relative"
          variant="filled"
          color="white"
          ripple={false}
          onClick={() => handleOpenCurrencyDialog(false)}
        >
          <div className="h-6 w-6 relative">
            <Image
              src={`/tokens/${receiveCurrency}.svg`}
              alt={receiveCurrency}
              fill={true}
            />
          </div>
          <Typography>{receiveCurrency}</Typography>
          <DropdownIcon id={2} open={0} />
        </Button>
      </div>
      <CurrencyDialog
        selectedPay={selectedPay}
        open={openCurrencyDialog}
        handleOpen={() => handleOpenCurrencyDialog(selectedPay)}
        handleSelectCurrency={handleSelectCurrency}
        payCurrency={payCurrency}
        receiveCurrency={receiveCurrency}
      />
    </div>
  );
};
export default SwapInterface;
