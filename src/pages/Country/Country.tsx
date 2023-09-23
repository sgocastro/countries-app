import { useEffect, useState } from "react"
import { Link, RouteComponentProps } from "wouter"
import { CountryData } from "../../types"
import "./styles.css"
import { api } from "../../api"
import { COUNTRY_DATA_PARSER, Stat } from "../../helpers"
import { LeftArrow } from "../../icons"
import { CountryStats, BorderCountries } from "./components"

type CountryParams = {
  code: string
}

type CountryProps = RouteComponentProps<CountryParams> & {}

export type CountryInformation = Omit<CountryData, "cca3">

export const Country: React.FC<CountryProps> = ({ params }) => {
  const [countryInformation, setCountryInformation] =
    useState<CountryInformation | null>(null)

  useEffect(() => {
    ;(async () => {
      const countryResult = await api.get.byAlphaCode({
        countryAlphaCode: params.code,
      })
      setCountryInformation(countryResult)
    })()
  }, [])

  if (countryInformation == null) {
    return null
  }

  const { flags, name } = countryInformation

  const countryData = Object.keys(countryInformation)
    .filter((key) => key !== "name" && key !== "flags" && key !== "borders")
    .sort(
      (a, b) =>
        COUNTRY_DATA_PARSER[a as Stat].showOrder -
        COUNTRY_DATA_PARSER[b as Stat].showOrder
    )

  return (
    <div className="country-container">
      <Link to="/">
        <button className="country__navigation__go-back-btn">
          <LeftArrow />
          Back
        </button>
      </Link>
      <section className="country">
        <img
          src={flags.png}
          alt={flags.alt == "" ? name : flags.alt}
          className="country__flag"
        />
        <article className="country__information">
          <h2 className="country__information__name">{name}</h2>
          <section className="country__information__stats__container">
            <CountryStats
              stats={countryData.slice(0, 5)}
              countryInformation={countryInformation}
            />
            <CountryStats
              stats={countryData.slice(5, 8)}
              countryInformation={countryInformation}
            />
          </section>
          <BorderCountries countries={countryInformation.borders} />
        </article>
      </section>
    </div>
  )
}
