import { z } from "zod"

const RawCountriesSchema = z.object({
  flags: z.object({
    png: z.string(),
    alt: z.string(),
  }),
  name: z.object({
    common: z.string(),
  }),
  cca3: z.string(),
  capital: z.array(z.string()),
  region: z.string(),
  population: z.number(),
})

const ObjectCountriesSchema = z.object({
  flags: z.object({
    png: z.string(),
    alt: z.string(),
  }),
  name: z.string(),
  cca3: z.string(),
  capital: z.array(z.string()),
  region: z.string(),
  population: z.number(),
})

export type Response = z.infer<typeof RawCountriesSchema>
export type Result = z.infer<typeof ObjectCountriesSchema>
