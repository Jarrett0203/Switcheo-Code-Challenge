export interface WalletBalance {
  currency: string;
  amount: number;
  blockchain: string;
}
// formattedWalletBalance should extend from WalletBalance
export interface FormattedWalletBalance extends WalletBalance {
  formatted: string;
}

export function useWalletBalances(): WalletBalance[] {
  return [
    { currency: 'OSMO', amount: 5, blockchain: 'Osmosis' },
    { currency: 'ETH', amount: 15, blockchain: 'Ethereum' },
    { currency: 'bNEO', amount: 30, blockchain: 'Neo' },
    { currency: 'ZIL', amount: 20, blockchain: 'Zilliqa' },
    { currency: 'RATOM', amount: 10, blockchain: 'Arbitrum' },
    { currency: "BTC", amount: 20, blockchain: "Bitcoin"}
  ];
}