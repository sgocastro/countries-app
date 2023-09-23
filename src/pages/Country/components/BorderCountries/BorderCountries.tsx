import "./styles.css"
import { api } from "../../../../api"
import { useCallback, useState } from "react"
import { parseArrayToString } from "../../../../utils"
import { SpinnerLoading } from "../../../../components"
import { useApi } from "../../../../hooks"
import { CountryData } from "../../../../types"

type BorderCountriesProps = {
  countries: Array<string>
}

export const BorderCountries = ({ countries }: BorderCountriesProps) => {
  const [countriesNames, setCountriesNames] = useState<
    Array<Pick<CountryData, "name">>
  >([])

  const getCountriesNames = useCallback(async () => {
    if (countries.length === 0) return

    const countriesResult = await api.getAll.byAlphaCodes({
      codes: parseArrayToString(countries).replace(/ /g, ""),
    })
    setCountriesNames(countriesResult)
  }, [countries])

  const { isFetching, hasError } = useApi({ callApi: getCountriesNames })

  if (countries.length === 0 || hasError) return null

  return (
    <section className="border-countries">
      {isFetching ? (
        <SpinnerLoading />
      ) : (
        <>
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
        </>
      )}
    </section>
  )
}
