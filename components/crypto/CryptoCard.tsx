import * as Avatar from "@radix-ui/react-avatar";
import type { CryptoMarket } from "@/lib/types";

interface CryptoCardProps {
  crypto: CryptoMarket;
}

function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: price < 1 ? 4 : 2,
    maximumFractionDigits: price < 1 ? 6 : 2,
  }).format(price);
}

function formatMarketCap(marketCap: number): string {
  if (marketCap >= 1e12) return `$${(marketCap / 1e12).toFixed(2)}T`;
  if (marketCap >= 1e9) return `$${(marketCap / 1e9).toFixed(2)}B`;
  if (marketCap >= 1e6) return `$${(marketCap / 1e6).toFixed(2)}M`;
  return `$${marketCap.toLocaleString()}`;
}

export function CryptoCard({ crypto }: CryptoCardProps) {
  const change = crypto.price_change_percentage_24h;
  const isPositive = change >= 0;

  return (
    <div className="flex flex-col gap-3 rounded-xl border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-700 dark:bg-zinc-800">
      <div className="flex items-center gap-3">
        <Avatar.Root className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-700">
          <Avatar.Image
            src={crypto.image}
            alt={crypto.name}
            className="h-10 w-10 rounded-full object-cover"
          />
          <Avatar.Fallback className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">
            {crypto.symbol.slice(0, 2).toUpperCase()}
          </Avatar.Fallback>
        </Avatar.Root>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5">
            <span className="rounded bg-zinc-100 px-1.5 py-0.5 text-xs font-medium text-zinc-500 dark:bg-zinc-700 dark:text-zinc-400">
              #{crypto.market_cap_rank}
            </span>
            <span className="truncate text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              {crypto.name}
            </span>
          </div>
          <span className="text-xs uppercase text-zinc-400 dark:text-zinc-500">
            {crypto.symbol}
          </span>
        </div>
      </div>

      <div className="flex items-end justify-between">
        <span className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
          {formatPrice(crypto.current_price)}
        </span>
        <span
          className={`text-sm font-medium ${
            isPositive
              ? "text-emerald-600 dark:text-emerald-400"
              : "text-red-500 dark:text-red-400"
          }`}
        >
          {isPositive ? "+" : ""}
          {change?.toFixed(2)}%
        </span>
      </div>

      <div className="text-xs text-zinc-400 dark:text-zinc-500">
        Market cap: {formatMarketCap(crypto.market_cap)}
      </div>
    </div>
  );
}
