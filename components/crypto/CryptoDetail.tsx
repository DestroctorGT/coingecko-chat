import * as Avatar from '@radix-ui/react-avatar';
import * as Separator from '@radix-ui/react-separator';
import type { CryptoMarket } from '@/lib/types';
import { SourceBadge } from '@/components/ui/SourceBadge';

interface CryptoDetailProps {
  crypto: CryptoMarket;
}

function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
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

export function CryptoDetail({ crypto }: CryptoDetailProps) {
  const change = crypto.price_change_percentage_24h;
  const isPositive = change >= 0;

  return (
    <div className="w-full max-w-sm rounded-xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-700 dark:bg-zinc-800">
      <div className="flex items-center gap-4">
        <Avatar.Root className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-700">
          <Avatar.Image
            src={crypto.image}
            alt={crypto.name}
            className="h-14 w-14 rounded-full object-cover"
          />
          <Avatar.Fallback className="text-sm font-semibold text-zinc-500 dark:text-zinc-400">
            {crypto.symbol.slice(0, 2).toUpperCase()}
          </Avatar.Fallback>
        </Avatar.Root>
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
              {crypto.name}
            </h3>
            <span className="rounded bg-zinc-100 px-1.5 py-0.5 text-xs font-medium text-zinc-500 dark:bg-zinc-700 dark:text-zinc-400">
              #{crypto.market_cap_rank}
            </span>
          </div>
          <span className="text-sm uppercase text-zinc-400 dark:text-zinc-500">
            {crypto.symbol}
          </span>
        </div>
      </div>

      <Separator.Root className="my-4 h-px bg-zinc-100 dark:bg-zinc-700" />

      <div className="flex flex-col gap-3">
        <div className="flex items-end justify-between">
          <span className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
            {formatPrice(crypto.current_price)}
          </span>
          <span
            className={`rounded-full px-2.5 py-1 text-sm font-semibold ${
              isPositive
                ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400'
                : 'bg-red-50 text-red-600 dark:bg-red-900/30 dark:text-red-400'
            }`}
          >
            {isPositive ? '+' : ''}{change?.toFixed(2)}% (24h)
          </span>
        </div>

        <div className="text-sm text-zinc-500 dark:text-zinc-400">
          Market cap: <span className="font-medium text-zinc-700 dark:text-zinc-300">{formatMarketCap(crypto.market_cap)}</span>
        </div>
      </div>

      <div className="mt-4">
        <SourceBadge updatedAt={crypto.last_updated} />
      </div>
    </div>
  );
}
