import { Response, Result } from "./types"

type GetAllByAlphaCodes = {
  codes: string
}

export const byAlphaCodes = async ({
  codes,
}: GetAllByAlphaCodes): Promise<Array<Result>> => {
  const response = await fetch(
    `https://restcountries.com/v3.1/alpha?codes=${codes}&fields=name`,
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
    name: country.name.common,
  }))
}
