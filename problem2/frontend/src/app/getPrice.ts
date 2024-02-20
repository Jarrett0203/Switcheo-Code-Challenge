import { Currency } from "./currrency";

export async function getCurrencyPrice(currencyName: Currency) {
  const response = await fetch(`http://localhost:3001/price`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ "currency": currencyName }),
  });

  if (response.status === 200) {
    const data = await response.json();
    return data;
  } else {
    throw new Error("Failed to fetch price");
  }
}