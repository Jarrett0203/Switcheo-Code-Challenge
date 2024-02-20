import AppNavbar from "./AppNavbar";
import { ThemeProvider, Typography } from "./materialTailwind";
import SwapCard from "./SwapCard";
import TransactionDetails from "./TransactionDetails";

export default function Home() {
  return (
    <ThemeProvider>
      <main className="flex min-h-screen flex-col">
        <AppNavbar />
        <div className="flex flex-col justify-center flex-1 w-2/5 m-auto">
          <div className="w-full justify-items-start">
            <Typography className="ml-5" variant="h6" color="blue-gray">
              Swap
            </Typography>
          </div>
          <SwapCard />
          <TransactionDetails />
        </div>
      </main>
    </ThemeProvider>
  );
}
