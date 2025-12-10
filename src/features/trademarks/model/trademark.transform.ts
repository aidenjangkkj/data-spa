// src/features/trademarks/model/trademark.transform.ts
import type { Trademark } from "./trademark.common";
import type { TrademarkKrRaw } from "./trademark.kr.schema";
import type { TrademarkUsRaw } from "./trademark.us.schema";

function normalizeDate(yyyymmdd?: string | null): string | undefined {
  if (!yyyymmdd) return undefined;
  if (yyyymmdd.length !== 8) return yyyymmdd;
  return `${yyyymmdd.slice(0, 4)}-${yyyymmdd.slice(4, 6)}-${yyyymmdd.slice(6)}`;
}

function normalizeDateArray(dates?: (string | null)[] | null): string[] {
  if (!dates) return [];
  return dates
    .map((d) => normalizeDate(d))
    .filter((d): d is string => Boolean(d));
}

export function mapKrToTrademark(raw: TrademarkKrRaw): Trademark {
  const nameKo = raw.productName ?? undefined;
  const nameEn =
    raw.productNameEng ??
    raw.productName ?? // 한글명으로라도 채움
    "";

  return {
    id: `KR-${raw.applicationNumber}`,
    country: "KR",
    nameKo,
    nameEn,
    applicationNumber: raw.applicationNumber,
    applicationDate: normalizeDate(raw.applicationDate) ?? raw.applicationDate,
    registerStatus: raw.registerStatus,
    publicationNumber: raw.publicationNumber ?? undefined,
    publicationDate: normalizeDate(raw.publicationDate),

    registrationNumbers: raw.registrationNumber ?? [],
    registrationDates: normalizeDateArray(raw.registrationDate),

    mainClassCodes: raw.asignProductMainCodeList ?? [],
    subClassCodes: raw.asignProductSubCodeList ?? [],
    viennaCodes: raw.viennaCodeList ?? [],
  };
}

export function mapUsToTrademark(raw: TrademarkUsRaw): Trademark {
  const nameEn = raw.productName ?? "";

  return {
    id: `US-${raw.applicationNumber}`,
    country: "US",
    nameKo: undefined,
    nameEn,
    applicationNumber: raw.applicationNumber,
    applicationDate: normalizeDate(raw.applicationDate) ?? raw.applicationDate,
    registerStatus: raw.registerStatus,
    publicationNumber: undefined,
    publicationDate: normalizeDate(raw.publicationDate),

    registrationNumbers: raw.registrationNumber ?? [],
    registrationDates: normalizeDateArray(raw.registrationDate),

    mainClassCodes: raw.asignProductMainCodeList ?? [],
    subClassCodes: raw.usClassCodeList ?? [],
    viennaCodes: raw.viennaCodeList ?? [],
  };
}
