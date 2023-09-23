import { CountryData } from "../types"
import { parseArrayToString } from "../utils"

export type Stat = keyof Pick<
  CountryData,
  | "capital"
  | "region"
  | "subregion"
  | "tld"
  | "currencies"
  | "languages"
  | "nativeName"
  | "population"
>

type CountryStatParser = {
  description: string
  parserData: (data: string | Array<string> | number) => string
  showOrder: number
}

export const COUNTRY_DATA_PARSER: Record<Stat, CountryStatParser> = {
  nativeName: {
    description: "Native Name",
    showOrder: 1,
    parserData: (data) => parseArrayToString(data as Array<string>),
  },
  population: {
    description: "Population",
    showOrder: 2,
    parserData: (data) => (data as number).toLocaleString("en-US"),
  },
  region: {
    description: "Region",
    showOrder: 3,
    parserData: (data) => data as string,
  },
  subregion: {
    description: "Sub Region",
    showOrder: 4,
    parserData: (data) => data as string,
  },
  capital: {
    description: "Capital",
    showOrder: 5,
    parserData: (data) => parseArrayToString(data as Array<string>),
  },
  tld: {
    description: "Top Level Domain",
    showOrder: 6,
    parserData: (data) => parseArrayToString(data as Array<string>),
  },
  currencies: {
    description: "Currencies",
    showOrder: 7,
    parserData: (data) => parseArrayToString(data as Array<string>),
  },
  languages: {
    description: "Languages",
    showOrder: 8,
    parserData: (data) => parseArrayToString(data as Array<string>),
  },
}
