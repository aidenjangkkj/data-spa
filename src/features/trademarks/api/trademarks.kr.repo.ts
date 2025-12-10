// src/features/trademarks/api/trademarks.kr.repo.ts
import { fetchWithSchema } from "./client";
import {
  TrademarkKrListSchema,
  type TrademarkKrRawList,
} from "../model/trademark.kr.schema";
import { mapKrToTrademark } from "../model/trademark.transform";
import type { Trademark } from "../model/trademark.common";

// 원본 JSON 그대로 가져오기
export async function fetchKrRaw(): Promise<TrademarkKrRawList> {
  return fetchWithSchema(
    "/data/trademarks_kr_trademarks.json",
    TrademarkKrListSchema
  );
}

// UI에서 바로 쓸 수 있는 공통 도메인 모델로 변환
export async function fetchKrTrademarks(): Promise<Trademark[]> {
  const rawList = await fetchKrRaw();
  return rawList.map(mapKrToTrademark);
}
