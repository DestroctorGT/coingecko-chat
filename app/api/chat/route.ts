import {
  streamText,
  tool,
  convertToModelMessages,
  stepCountIs,
  gateway,
} from "ai";
import { z } from "zod";
import { getTop10, getCryptoByQuery } from "@/lib/coingecko";

const systemPrompt = `You are a helpful cryptocurrency assistant powered by CoinGecko data.
Always respond in the same language the user writes in.
NEVER invent or guess cryptocurrency prices, market caps, or financial data.
When the user asks about prices or crypto information, always use the available tools to fetch real data.
If a tool returns null for a cryptocurrency, tell the user that it was not found.
Format prices and numbers in a readable way.`;

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = streamText({
    model: gateway("openai/gpt-5-mini"),
    system: systemPrompt,
    messages: await convertToModelMessages(messages),
    stopWhen: stepCountIs(5),
    tools: {
      getTop10Cryptos: tool({
        description:
          "Get the top 10 cryptocurrencies by market cap with current prices and stats",
        inputSchema: z.object({}),
        execute: async () => getTop10(),
      }),
      getCryptoByQuery: tool({
        description:
          'Get details of a specific cryptocurrency by name, symbol, or ID (e.g. "bitcoin", "eth", "BTC", "solana")',
        inputSchema: z.object({
          query: z
            .string()
            .describe("The cryptocurrency name, symbol, or ID to search for"),
        }),
        execute: async ({ query }) => getCryptoByQuery(query),
      }),
    },
  });

  return result.toUIMessageStreamResponse();
}
