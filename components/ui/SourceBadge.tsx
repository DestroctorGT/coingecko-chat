interface SourceBadgeProps {
  updatedAt?: string;
}

export function SourceBadge({ updatedAt }: SourceBadgeProps) {
  const time = updatedAt
    ? new Date(updatedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    : new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-zinc-100 px-2.5 py-0.5 text-xs text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400">
      Fuente: CoinGecko · actualizado {time}
    </span>
  );
}
