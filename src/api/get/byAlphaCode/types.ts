import { z } from "zod"

const RawCountriesSchema = z.object({
  flags: z.object({
    png: z.string(),
    svg: z.string(),
    alt: z.string(),
  }),
  name: z.object({
    common: z.string(),
    nativeName: z.record(
      z.string(),
      z.object({
        common: z.string(),
      })
    ),
  }),
  tld: z.array(z.string()),
  currencies: z.record(
    z.string(),
    z.object({
      name: z.string(),
    })
  ),
  capital: z.array(z.string()),
  region: z.string(),
  subregion: z.string(),
  languages: z.record(z.string(), z.string()),
  borders: z.array(z.string()),
  population: z.number(),
})

const ObjectCountriesSchema = z.object({
  flags: z.object({
    png: z.string(),
    alt: z.string(),
    svg: z.string(),
  }),
  name: z.string(),
  capital: z.array(z.string()),
  region: z.string(),
  population: z.number(),
  currencies: z.array(z.string()),
  languages: z.array(z.string()),
  nativeName: z.array(z.string()),
  subregion: z.string(),
  tld: z.array(z.string()),
  borders: z.array(z.string()),
})

export type Response = z.infer<typeof RawCountriesSchema>
export type Result = z.infer<typeof ObjectCountriesSchema>

/*
"flags": {
    "png": "https://flagcdn.com/w320/ps.png",
    "svg": "https://flagcdn.com/ps.svg",
    "alt": ""
},
"name": {
    "common": "Palestine",
    "official": "State of Palestine",
    "nativeName": {
        "ara": {
            "official": "دولة فلسطين",
            "common": "فلسطين"
        }
    }
},
"tld": [
    ".ps",
    "فلسطين."
],
"currencies": {
    "EGP": {
        "name": "Egyptian pound",
        "symbol": "E£"
    },
    "ILS": {
        "name": "Israeli new shekel",
        "symbol": "₪"
    },
    "JOD": {
        "name": "Jordanian dinar",
        "symbol": "JD"
    }
},
"capital": [
    "Ramallah",
    "Jerusalem"
],
"region": "Asia",
"subregion": "Western Asia",
"languages": {
    "ara": "Arabic"
},
"borders": [
    "ISR",
    "EGY",
    "JOR"
],
"population": 4803269
*/
