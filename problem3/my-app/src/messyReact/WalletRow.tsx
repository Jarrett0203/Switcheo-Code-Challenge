import React from "react";
import "../styles.css";

type WalletRowProps = {
  className: string;
  key: number;
  amount: number;
  usdValue: string;
  formattedAmount: string;
};

const WalletRow: React.FC<WalletRowProps> = ({
  className,
  key,
  amount,
  usdValue,
  formattedAmount,
}) => {
  return (
    <div className={`flex wallet-row ${className}`}>
      <div className="currency">
        {className} | USD <span className="usd-value">{usdValue}</span>{" "}
      </div>
      <div className="info">Estimated Amount: {formattedAmount}</div>
    </div>
  );
};
export default WalletRow;
