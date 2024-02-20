"use client";

import React from "react";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Typography,
} from "./materialTailwind";
import SwapInterface from "./SwapInterface";
import WalletDialog from "./WalletDialog";
type SwapCardProps = {};

const SwapCard: React.FC<SwapCardProps> = () => {
  const [openWallet, setOpenWallet] = React.useState(false);

  const handleWalletClick = () => {
    setOpenWallet(!openWallet);
  };
  return (
    <Card className="w-full h-full bg-gray-50">
      <CardBody>
        <SwapInterface />
      </CardBody>
      <CardFooter>
        <Button onClick={handleWalletClick} className="w-full" color="blue">
          <Typography color="white">Connect Wallet</Typography>
        </Button>
        <WalletDialog open={openWallet} handleOpen={handleWalletClick} />
      </CardFooter>
    </Card>
  );
};
export default SwapCard;
