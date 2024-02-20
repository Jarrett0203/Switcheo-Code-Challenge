import express from 'express';
import axios from 'axios';
import cors from 'cors';

const app = express();
const PORT = 3001;

app.use(express.json());
app.use(cors());

interface CurrencyItem {
  currency: string;
  price: number;
  // Add any other properties here if applicable
}

app.post('/price', async (req, res) => {
  const currencyName = req.body.currency;
  if (!currencyName) {
    return res.status(400).json({ message: 'Missing currency.' });
  }

  try {
    const { data } = await axios.get('https://interview.switcheo.com/prices.json');
    const currencyData: CurrencyItem | undefined = data.find((item: CurrencyItem) => item.currency === currencyName);

    if (!currencyData) {
      return res.status(404).json({ message: 'Currency not found.' });
    }

    res.json({currency: currencyData.currency, price: currencyData.price});
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch price.' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});