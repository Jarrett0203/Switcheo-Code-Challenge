class BlockchainPriority {
  private static blockchainPriorities: { [blockchain: string]: number } = {
    'Osmosis': 100,
    'Ethereum': 50,
    'Arbitrum': 30,
    'Zilliqa': 20,
    'Neo': 20,
  };
  
  static getPriority = (blockchain: string): number => {
    return this.blockchainPriorities[blockchain] ?? -99;
  }
}

export const getPriority = BlockchainPriority.getPriority;