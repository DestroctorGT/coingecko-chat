import type { CryptoMarket } from "./types";

const BASE_URL = "https://api.coingecko.com/api/v3";

function getHeaders() {
  return {
    "x-cg-demo-api-key": process.env.COINGECKO_API_KEY!,
  };
}

export async function getTop10(): Promise<CryptoMarket[]> {
  const url = `${BASE_URL}/coins/markets?vs_currency=usd&per_page=10&order=market_cap_desc`;
  const res = await fetch(url, {
    headers: getHeaders(),
    next: { revalidate: 60 },
  });

  if (!res.ok) return [];
  return res.json();
}

export async function getCryptoByQuery(
  query: string,
): Promise<CryptoMarket | null> {
  const normalized = query.toLowerCase().trim();

  // Step 1: Try as direct ID
  const directUrl = `${BASE_URL}/coins/markets?vs_currency=usd&ids=${encodeURIComponent(normalized)}`;
  const directRes = await fetch(directUrl, {
    headers: getHeaders(),
    next: { revalidate: 60 },
  });

  if (directRes.ok) {
    const directResult: CryptoMarket[] = await directRes.json();
    if (directResult.length > 0) return directResult[0];
  }

  // Step 2: Search via /search
  const searchUrl = `${BASE_URL}/search?query=${encodeURIComponent(query)}`;
  const searchRes = await fetch(searchUrl, {
    headers: getHeaders(),
    next: { revalidate: 60 },
  });
  if (!searchRes.ok) return null;
  const searchData = await searchRes.json();
  const coins: { id: string }[] = searchData.coins ?? [];
  if (coins.length === 0) return null;

  const foundId = coins[0].id;

  // Step 3: Fetch markets for the found ID
  const marketsUrl = `${BASE_URL}/coins/markets?vs_currency=usd&ids=${encodeURIComponent(foundId)}`;
  const marketsRes = await fetch(marketsUrl, {
    headers: getHeaders(),
    next: { revalidate: 60 },
  });
  if (!marketsRes.ok) return null;
  const marketsResult: CryptoMarket[] = await marketsRes.json();
  return marketsResult.length > 0 ? marketsResult[0] : null;
}
