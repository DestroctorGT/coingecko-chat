"use client";

import { useEffect, useRef } from "react";
import * as ScrollArea from "@radix-ui/react-scroll-area";
import type { UIMessage } from "ai";
import { MessageBubble } from "./MessageBubble";
import { MessageSkeleton } from "@/components/ui/Skeleton";

interface MessageListProps {
  messages: UIMessage[];
  isLoading: boolean;
}

export function MessageList({ messages, isLoading }: MessageListProps) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  return (
    <ScrollArea.Root className="flex-1 overflow-hidden">
      <ScrollArea.Viewport className="h-full w-full">
        <div className="flex flex-col gap-4 px-4 py-4">
          {messages.length === 0 && (
            <div className="flex flex-col items-center justify-center gap-3 py-16 text-center">
              <div className="text-4xl">₿</div>
              <h2 className="text-lg font-semibold text-zinc-700 dark:text-zinc-300">
                CryptoChat
              </h2>
              <p className="max-w-xs text-sm text-zinc-400 dark:text-zinc-500">
                Pregunta sobre el precio de cualquier cripto, el top 10 por
                capitalización, o simplemente conversa.
              </p>
            </div>
          )}

          {messages.map((message) => (
            <MessageBubble key={message.id} message={message} />
          ))}

          {(() => {
            const lastMessage = messages[messages.length - 1];
            const showMessageSkeleton =
              isLoading &&
              (lastMessage?.role === "user" ||
                (lastMessage?.role === "assistant" &&
                  !lastMessage.parts?.some(
                    (p) =>
                      (p.type === "text" &&
                        (p as { type: "text"; text: string }).text?.trim()) ||
                      p.type === "tool-getTop10Cryptos" ||
                      p.type === "tool-getCryptoByQuery",
                  )));
            return showMessageSkeleton ? <MessageSkeleton /> : null;
          })()}

          <div ref={bottomRef} />
        </div>
      </ScrollArea.Viewport>
      <ScrollArea.Scrollbar
        className="flex touch-none select-none p-0.5 transition-colors data-[orientation=vertical]:w-2.5"
        orientation="vertical"
      >
        <ScrollArea.Thumb className="relative flex-1 rounded-full bg-zinc-300 dark:bg-zinc-600" />
      </ScrollArea.Scrollbar>
    </ScrollArea.Root>
  );
}
