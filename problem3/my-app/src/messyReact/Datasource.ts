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