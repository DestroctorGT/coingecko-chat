import type { CryptoMarket } from "@/lib/types";
import { CryptoCard } from "./CryptoCard";
import { SourceBadge } from "@/components/ui/SourceBadge";

interface Top10GridProps {
  cryptos: CryptoMarket[];
}

export function Top10Grid({ cryptos }: Top10GridProps) {
  if (!cryptos || cryptos.length === 0) {
    return <p className="text-sm text-zinc-500">No se encontraron datos.</p>;
  }

  const lastUpdated = cryptos[0]?.last_updated;

  return (
    <div className="flex flex-col gap-3 w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
        {cryptos.map((crypto) => (
          <CryptoCard key={crypto.id} crypto={crypto} />
        ))}
      </div>
      <div>
        <SourceBadge updatedAt={lastUpdated} />
      </div>
    </div>
  );
}
