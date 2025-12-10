import type { CountryCode } from "../../country/model/country.types";

export interface Trademark {
  id: string;
  country: CountryCode;
  nameKo?: string;
  nameEn: string;

  applicationNumber: string;
  applicationDate: string;
  registerStatus: string;

  publicationNumber?: string;
  publicationDate?: string;

  registrationNumbers: string[];
  registrationDates: string[];

  mainClassCodes: string[];
  subClassCodes: string[];
  viennaCodes: string[];
}
