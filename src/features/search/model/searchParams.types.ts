import type { CountryCode } from "../../country/model/country.types";

export type RegisterStatusFilter =
  | "ALL"
  // KR 전용
  | "KR_출원"
  | "KR_등록"
  | "KR_실효"
  | "KR_거절"
  // US 전용
  | "US_LIVE"
  | "US_DEAD";

export interface SearchParams {
  country: CountryCode;

  keyword: string;
  applicationNumber: string;

  applicationDateFrom?: string;
  applicationDateTo?: string;

  // KR 전용
  publicationNumber: string;
  registrationPubNumber: string;
  registrationPubDateFrom?: string;
  registrationPubDateTo?: string;

  // 공통
  publicationDateFrom?: string;
  publicationDateTo?: string;

  registrationNumber: string;
  mainClass: string;
  subClass: string;

  registerStatus: RegisterStatusFilter;
}
