import { useEffect, useState } from "react"
import { LinkCountryCard } from "./components"
import { Country } from "./types"
import "./styles.css"

export const Home = (): JSX.Element => {
  const [countries, setCountries] = useState<Array<Country>>([])

  useEffect(() => {
    fetch(
      "https://restcountries.com/v3.1/all?fields=name,cca3,population,capital,region,flags"
    )
      .then((response) => response.json())
      .then((data) => setCountries(data))
  }, [])

  return (
    <div className="countries-list">
      {countries.map((country) => (
        <LinkCountryCard
          key={`${country.name.common}-${country.cca3}`}
          {...country}
        />
      ))}
    </div>
  )
}
