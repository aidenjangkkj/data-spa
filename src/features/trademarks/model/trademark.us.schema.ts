import { z } from "zod";

/**
 * 미국 상표 원본 JSON 1건에 대한 스키마
 * (trademarks_us_trademarks.json 기반)
 */
export const TrademarkUsSchema = z.object({
  productName: z.string().nullable(), // 상표명(영문) 또는 null

  applicationNumber: z.string(), // 출원번호
  applicationDate: z.string(), // 출원일(YYYYMMDD 문자열)

  registerStatus: z.string(), // 'LIVE', 'DEAD' 등

  publicationDate: z.string().nullable(), // 공고일(YYYYMMDD) 또는 null

  // 등록번호/등록일: 배열 또는 null
  registrationNumber: z.array(z.string()).nullable(),
  registrationDate: z.array(z.string()).nullable(),

  internationalRegDate: z.string().nullable(), // 국제등록일
  internationalRegNumbers: z.array(z.string()).nullable(), // 국제등록번호 리스트

  priorityClaimNumList: z.array(z.string()).nullable(), // 우선권 주장 번호 리스트
  priorityClaimDateList: z.array(z.string()).nullable(), // 우선권 주장일 리스트

  asignProductMainCodeList: z.array(z.string()), // 주상품류 코드 리스트
  usClassCodeList: z.array(z.string()), // 미국 분류 코드 리스트

  viennaCodeList: z.array(z.string()).nullable(), // 비엔나 코드 리스트 또는 null
});

export type TrademarkUsRaw = z.infer<typeof TrademarkUsSchema>;

// 리스트 전체 검증용
export const TrademarkUsListSchema = z.array(TrademarkUsSchema);
export type TrademarkUsRawList = z.infer<typeof TrademarkUsListSchema>;
