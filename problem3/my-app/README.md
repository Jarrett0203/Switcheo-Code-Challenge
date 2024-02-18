### Problem 3

1. Install dependencies with `npm install`.
2. Run `npm start`.

### Datasource Implementation
```typescript
export class Datasource {
  private url;
  constructor(url: string) {
    this.url = url;
  }
  async getPrices() {
    try {
      const response = await fetch(this.url);
      const data = await response.json();

    const prices: { [currency: string]: number } = {};
    data.forEach((entry: { currency: string; price: number }) => {
      prices[entry.currency] = entry.price;
    })

    return prices;
    } catch (error) {
      console.error(error);
      throw new Error("Failed to fetch prices");
    }
  }
}
```

### Issues
1. Missing imports
```typescript
import React, { useState, useEffect, useMemo } from 'react';
import { FormattedWalletBalance, WalletBalance, useWalletBalances } from "./UseWalletBalances";
import WalletRow from './WalletRow';
```
Imports for hooks like `useState` and React components such as `WalletRow` should be added.

2. `FormattedWalletBalance` should extend `WalletBalance`
```typescript
interface FormattedWalletBalance extends WalletBalance {
  formatted: string;
}
```
This is to adhere to the OOP principle of inheritance, to promote code reusability as `FormattedWalletBalance` can leverage on the functionality of `WalletBalance`.

3. Undefined `BoxProps` and missing `children` in `Props`
Not really clear on what `BoxProps` is used for, so it is removed.
```typescript
// originally interface Props extends BoxProps
interface Props {
  // added missing children field, may be used in the future
  children?: React.ReactNode;
}
```

4. Missing type declaration for prices when using `useState` hook
```typescript
  // originally const [prices, setPrices] = useState({});
	const [prices, setPrices] = useState<{[currency: string]: number}>({});
```

5. `console.err` typo
```typescript
useEffect(() => {
    const datasource = new Datasource("https://interview.switcheo.com/prices.json");
    datasource.getPrices().then(prices => {
      setPrices(prices);
    }).catch(error => {
      // typo here, original was console.err(error);
      console.error(error);
    });
  }, []);
```
6. Inconsistent variable names with `lhsPriority` and `balancePriority` and wrong `balance.amount` logic
```typescript
  return balances.filter((balance: WalletBalance) => {
		  const balancePriority = getPriority(balance.blockchain);
		  // originally lhsPriority > -99
      if (balancePriority > -99) {
        // originally balance.amount<=0, which doesn't make sense to choose zero or negative amounts
        if (balance.amount > 0) {
          return true;
        }
		  }
		  return false
  })
```

7. Missing else block in sort for `sortedBalances` and redundant `prices` dependency
```typescript
		}).sort((lhs: WalletBalance, rhs: WalletBalance) => {
			const leftPriority = getPriority(lhs.blockchain);
		  const rightPriority = getPriority(rhs.blockchain);
		  if (leftPriority > rightPriority) {
		    return -1;
		  } else if (rightPriority > leftPriority) {
		    return 1;
		  } else {
        // added in case priorities are the same
        return 0;
      }
    });
  // originally [balances, prices], removed prices as not used in sortedBalances
  }, [balances]);
```

8. `rows` should be using `formattedBalances` instead of `sortedBalances`
```typescript
// originally const rows = sortedBalances.map((balance: FormattedWalletBalance, index: number) => {
const rows = formattedBalances.map((balance: FormattedWalletBalance, index: number) => {
```

9. Lack of separation of concerns in `WalletPage`
`WalletPage` should have a single responsibility of displaying the wallet page and does not need to know the implementation of `Datasource`. Hence the `Datasource` implementation is shifted to a different file. Similar reasoning for `BlockchainPriority` as well.
