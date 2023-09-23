import { Result, Response } from "./../types"

type GetAllByNameParams = {
  region: string
}

export const byRegion = async ({
  region,
}: GetAllByNameParams): Promise<Array<Result>> => {
  const response = await fetch(
    `https://restcountries.com/v3.1/region/${region}?fields=name,cca3,population,capital,region,flags`,
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

  const data: Array<Response> = await response.json()

  return transformResponse(data)
}

const transformResponse = (data: Array<Response>): Array<Result> => {
  return data.map<Result>((country) => ({
    flags: country.flags,
    capital: country.capital,
    cca3: country.cca3,
    name: country.name.common,
    population: country.population,
    region: country.region,
  }))
}
