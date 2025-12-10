// src/features/trademarks/api/trademarks.us.repo.ts
import { fetchWithSchema } from "./client";
import {
  TrademarkUsListSchema,
  type TrademarkUsRawList,
} from "../model/trademark.us.schema";
import { mapUsToTrademark } from "../model/trademark.transform";
import type { Trademark } from "../model/trademark.common";

// 원본 JSON 그대로 가져오기
export async function fetchUsRaw(): Promise<TrademarkUsRawList> {
  return fetchWithSchema(
    "/data/trademarks_us_trademarks.json",
    TrademarkUsListSchema
  );
}

// 공통 도메인 모델로 변환
export async function fetchUsTrademarks(): Promise<Trademark[]> {
  const rawList = await fetchUsRaw();
  return rawList.map(mapUsToTrademark);
}
