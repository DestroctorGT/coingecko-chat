"use client";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { MessageList } from "./MessageList";
import { ChatInput } from "./ChatInput";

export function ChatContainer() {
  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({ api: "/api/chat" }),
  });

  const isLoading = status === "submitted" || status === "streaming";

  function handleSubmit(content: string) {
    sendMessage({ text: content });
  }

  return (
    <div className="flex h-[100dvh] flex-col bg-zinc-50 dark:bg-zinc-900">
      {/* Header */}
      <header className="flex items-center gap-2 border-b border-zinc-200 bg-white px-4 py-3 dark:border-zinc-700 dark:bg-zinc-800">
        <span className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
          CryptoChat
        </span>
      </header>

      {/* Messages */}
      <MessageList messages={messages} isLoading={isLoading} />

      {/* Input */}
      <div className="border-t border-zinc-200 bg-white px-4 py-3 pb-safe dark:border-zinc-700 dark:bg-zinc-800">
        <ChatInput onSubmit={handleSubmit} isLoading={isLoading} />
      </div>
    </div>
  );
}
