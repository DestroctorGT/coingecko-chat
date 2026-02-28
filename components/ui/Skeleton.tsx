export function CardSkeleton() {
  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-700 dark:bg-zinc-800">
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 animate-pulse rounded-full bg-zinc-200 dark:bg-zinc-700" />
        <div className="flex flex-col gap-2">
          <div className="h-4 w-24 animate-pulse rounded bg-zinc-200 dark:bg-zinc-700" />
          <div className="h-3 w-16 animate-pulse rounded bg-zinc-200 dark:bg-zinc-700" />
        </div>
      </div>
      <div className="mt-4 flex flex-col gap-2">
        <div className="h-5 w-32 animate-pulse rounded bg-zinc-200 dark:bg-zinc-700" />
        <div className="h-3 w-20 animate-pulse rounded bg-zinc-200 dark:bg-zinc-700" />
      </div>
    </div>
  );
}

export function DetailSkeleton() {
  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-700 dark:bg-zinc-800">
      <div className="flex items-center gap-4">
        <div className="h-14 w-14 animate-pulse rounded-full bg-zinc-200 dark:bg-zinc-700" />
        <div className="flex flex-col gap-2">
          <div className="h-5 w-32 animate-pulse rounded bg-zinc-200 dark:bg-zinc-700" />
          <div className="h-4 w-16 animate-pulse rounded bg-zinc-200 dark:bg-zinc-700" />
        </div>
      </div>
      <div className="mt-6 flex flex-col gap-3">
        <div className="h-8 w-40 animate-pulse rounded bg-zinc-200 dark:bg-zinc-700" />
        <div className="h-4 w-28 animate-pulse rounded bg-zinc-200 dark:bg-zinc-700" />
        <div className="h-4 w-24 animate-pulse rounded bg-zinc-200 dark:bg-zinc-700" />
      </div>
    </div>
  );
}

export function MessageSkeleton() {
  return (
    <div className="flex gap-2">
      <div className="h-8 w-8 animate-pulse rounded-full bg-zinc-200 dark:bg-zinc-700" />
      <div className="flex flex-col gap-2">
        <div className="h-4 w-48 animate-pulse rounded bg-zinc-200 dark:bg-zinc-700" />
        <div className="h-4 w-36 animate-pulse rounded bg-zinc-200 dark:bg-zinc-700" />
      </div>
    </div>
  );
}
