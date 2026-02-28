import type { UIMessage } from "ai";
import { Top10Grid } from "@/components/crypto/Top10Grid";
import { CryptoDetail } from "@/components/crypto/CryptoDetail";
import { CardSkeleton, DetailSkeleton } from "@/components/ui/Skeleton";
import type { CryptoMarket } from "@/lib/types";

interface MessageBubbleProps {
  message: UIMessage;
}

export function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.role === "user";

  if (isUser) {
    const text = message.parts
      .filter((p) => p.type === "text")
      .map((p) => (p as { type: "text"; text: string }).text)
      .join("");
    return (
      <div className="flex justify-end">
        <div className="max-w-[80%] rounded-2xl rounded-tr-sm bg-zinc-900 px-4 py-2.5 text-sm text-white dark:bg-zinc-100 dark:text-zinc-900">
          {text}
        </div>
      </div>
    );
  }

  // Assistant message — iterate parts
  return (
    <div className="flex flex-col gap-3">
      {message.parts.map((part, i) => {
        if (part.type === "text") {
          const textPart = part as { type: "text"; text: string };
          if (!textPart.text.trim()) return null;
          return (
            <div key={i} className="flex justify-start">
              <div className="max-w-[85%] whitespace-pre-wrap rounded-2xl rounded-tl-sm bg-zinc-100 px-4 py-2.5 text-sm text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100">
                {textPart.text}
              </div>
            </div>
          );
        }

        // Tool parts: type is 'tool-getTop10Cryptos' or 'tool-getCryptoByQuery'
        if (part.type === "tool-getTop10Cryptos") {
          const toolPart = part as {
            type: string;
            state: string;
            output?: CryptoMarket[];
          };

          if (
            toolPart.state === "input-streaming" ||
            toolPart.state === "input-available"
          ) {
            return (
              <div key={i} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                {Array.from({ length: 6 }).map((_, j) => (
                  <CardSkeleton key={j} />
                ))}
              </div>
            );
          }

          if (toolPart.state === "output-available" && toolPart.output) {
            return (
              <div key={i}>
                <Top10Grid cryptos={toolPart.output} />
              </div>
            );
          }

          return null;
        }

        if (part.type === "tool-getCryptoByQuery") {
          const toolPart = part as {
            type: string;
            state: string;
            output?: CryptoMarket | null;
          };

          if (
            toolPart.state === "input-streaming" ||
            toolPart.state === "input-available"
          ) {
            return (
              <div key={i}>
                <DetailSkeleton />
              </div>
            );
          }

          if (toolPart.state === "output-available") {
            if (!toolPart.output) {
              return (
                <div key={i} className="flex justify-start">
                  <div className="rounded-2xl rounded-tl-sm bg-zinc-100 px-4 py-2.5 text-sm text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400">
                    Criptomoneda no encontrada.
                  </div>
                </div>
              );
            }
            return (
              <div key={i}>
                <CryptoDetail crypto={toolPart.output} />
              </div>
            );
          }

          return null;
        }

        // Dynamic tool or other part types — skip
        return null;
      })}
    </div>
  );
}
