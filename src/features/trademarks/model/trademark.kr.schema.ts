// src/features/trademarks/model/trademark.kr.schema.ts
import { z } from "zod";

/**
 * 한국 상표 원본 JSON 1건에 대한 스키마
 */
export const TrademarkKrSchema = z.object({
  productName: z.string().nullable(),
  productNameEng: z.string().nullable(),

  applicationNumber: z.string(),
  applicationDate: z.string(),

  registerStatus: z.string(),

  publicationNumber: z.string().nullable(),
  publicationDate: z.string().nullable(),

  registrationNumber: z.array(z.string()).nullable(),
  registrationDate: z.array(z.string().nullable()).nullable(),

  registrationPubNumber: z.string().nullable(),
  registrationPubDate: z.string().nullable(),

  internationalRegDate: z.string().nullable(),
  internationalRegNumbers: z.array(z.string()).nullable(),

  priorityClaimNumList: z.array(z.string()).nullable(),
  priorityClaimDateList: z.array(z.string()).nullable(),

  asignProductMainCodeList: z.array(z.string()).nullable(),
  asignProductSubCodeList: z.array(z.string()).nullable(),

  viennaCodeList: z.array(z.string()).nullable(),
});

export type TrademarkKrRaw = z.infer<typeof TrademarkKrSchema>;

export const TrademarkKrListSchema = z.array(TrademarkKrSchema);
export type TrademarkKrRawList = z.infer<typeof TrademarkKrListSchema>;
