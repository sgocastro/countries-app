import "./styles.css"
import { useCallback, useState } from "react"
import { Link, RouteComponentProps } from "wouter"
import { CountryData } from "../../types"
import { api } from "../../api"
import { COUNTRY_DATA_PARSER, Stat } from "../../helpers"
import { LeftArrow } from "../../icons"
import { CountryStats, BorderCountries } from "./components"
import { SpinnerLoading } from "../../components"
import { useApi } from "../../hooks"

type CountryParams = {
  code: string
}

type CountryProps = RouteComponentProps<CountryParams>

export type CountryInformation = Omit<CountryData, "cca3">

export const Country: React.FC<CountryProps> = ({ params }) => {
  const [countryInformation, setCountryInformation] =
    useState<CountryInformation | null>(null)

  const getCountry = useCallback(async () => {
    const countryResult = await api.get.byAlphaCode({
      countryAlphaCode: params.code,
    })

    setCountryInformation(countryResult)
  }, [params.code])

  const { isFetching, hasError } = useApi({ callApi: getCountry })

  return (
    <div className="country-container">
      {isFetching ? (
        <SpinnerLoading />
      ) : (
        <>
          <Link to="/">
            <button className="country__navigation__go-back-btn">
              <LeftArrow />
              Back
            </button>
          </Link>
          {!hasError && countryInformation != null ? (
            <>
              <section className="country">
                <img
                  src={countryInformation.flags.png}
                  alt={
                    countryInformation.flags.alt == ""
                      ? countryInformation.name
                      : countryInformation.flags.alt
                  }
                  className="country__flag"
                />
                <article className="country__information">
                  <h2 className="country__information__name">
                    {countryInformation.name}
                  </h2>
                  <section className="country__information__stats__container">
                    <CountryStats
                      stats={getCountryDataForStats().slice(0, 5)}
                      countryInformation={countryInformation}
                    />
                    <CountryStats
                      stats={getCountryDataForStats().slice(5, 8)}
                      countryInformation={countryInformation}
                    />
                  </section>
                  <BorderCountries countries={countryInformation.borders} />
                </article>
              </section>
            </>
          ) : (
            <h2>An error has occurred in finding the searched country.</h2>
          )}
        </>
      )}
    </div>
  )

  function getCountryDataForStats() {
    return Object.keys(countryInformation!)
      .filter((key) => key !== "name" && key !== "flags" && key !== "borders")
      .sort(
        (a, b) =>
          COUNTRY_DATA_PARSER[a as Stat].showOrder -
          COUNTRY_DATA_PARSER[b as Stat].showOrder
      )
  }
}
