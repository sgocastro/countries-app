import "./styles.css"
import { api } from "../../../../api"
import { useEffect, useState } from "react"
import { parseArrayToString } from "../../../../utils"

type BorderCountriesProps = {
  countries: Array<string>
}

export const BorderCountries = ({ countries }: BorderCountriesProps) => {
  const [countriesNames, setCountriesNames] = useState<Array<{
    name: string
  }> | null>(null)

  if (countries.length === 0) return null

  useEffect(() => {
    ;(async () => {
      const countriesResult = await api.getAll.byAlphaCodes({
        codes: parseArrayToString(countries).replace(/ /g, ""),
      })
      setCountriesNames(countriesResult)
    })()
  }, [])

  if (countriesNames == null) {
    return <div>Loading...</div>
  }

  return (
    <section className="border-countries">
      <h3 className="border-countries__title">Border Countries:</h3>
      <section className="border-countries__container">
        {countriesNames.map(({ name }, index) => (
          <div
            key={`${name}-${index}`}
            className="border-countries__container__country"
          >
            {name}
          </div>
        ))}
      </section>
    </section>
  )
}
