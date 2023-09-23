import { z } from "zod"

const RawCountriesSchema = z.object({
  name: z.object({
    common: z.string(),
  }),
})

const ObjectCountriesSchema = z.object({
  name: z.string(),
})

export type Response = z.infer<typeof RawCountriesSchema>
export type Result = z.infer<typeof ObjectCountriesSchema>
