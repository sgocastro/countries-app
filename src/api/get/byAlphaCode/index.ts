import { Result, Response } from "./types"

type GetByAlphaCodeParams = {
  countryAlphaCode: string
}

export const byAlphaCode = async ({
  countryAlphaCode,
}: GetByAlphaCodeParams): Promise<Result> => {
  const response = await fetch(
    `https://restcountries.com/v3.1/alpha/${countryAlphaCode}?fields=name,population,capital,region,flags,subregion,tld,languages,currencies,borders`,
    {
      method: "GET",
    }
  )

  if (response.status !== 200) {
    throw new Error(
      `API Error (getAll) - Status: ${
        response.status
      } - Message: ${response.text()}`
    )
  }

  const data: Response = await response.json()

  return transformResponse(data)
}

const transformResponse = (data: Response): Result => {
  return {
    flags: data.flags,
    capital: data.capital,
    name: data.name.common,
    population: data.population,
    region: data.region,
    nativeName: Object.entries(data.name.nativeName).map(
      ([_, value]) => value.common
    ),
    currencies: Object.entries(data.currencies).map(([_, value]) => value.name),
    subregion: data.subregion,
    tld: data.tld,
    borders: data.borders,
    languages: Object.entries(data.languages).map(([_, value]) => value),
  }
}
