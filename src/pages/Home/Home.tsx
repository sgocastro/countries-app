import "./styles.css"
import { FC, useCallback, useState } from "react"
import { LinkCountryCard } from "./components"
import { CountryData } from "../../types"
import { api } from "../../api"
import { Dropdown, Input, SpinnerLoading } from "../../components"
import { Search } from "../../icons"
import { useApi, useDebounce } from "../../hooks"

export type CountryCardInformation = Pick<
  CountryData,
  "flags" | "name" | "cca3" | "capital" | "region" | "population"
>

type Regions = (typeof REGIONS)[number]

const REGIONS = [
  "Todas",
  "Africa",
  "America",
  "Asia",
  "Europa",
  "Oceania",
] as const

export const Home: FC = () => {
  const [countries, setCountries] = useState<Array<CountryCardInformation>>([])
  const [searchCountry, setSearchCountry] = useState("")
  const [selectedRegion, setRegion] = useState<Regions>("Todas")
  const debouncedValue = useDebounce({ value: searchCountry, delay: 1000 })

  const fetchGetAllByRegion = useCallback(async () => {
    const parsedSelectedRegion =
      selectedRegion === "Europa" ? "europe" : selectedRegion.toLowerCase()
    return await api.getAll.byRegion({ region: parsedSelectedRegion })
  }, [selectedRegion])

  const getCountries = useCallback(async () => {
    const countriesApiResult =
      selectedRegion != "Todas"
        ? await fetchGetAllByRegion()
        : debouncedValue != ""
        ? await api.getAll.byName({ name: debouncedValue })
        : await api.getAll.all()

    setCountries(countriesApiResult)
  }, [debouncedValue, selectedRegion, fetchGetAllByRegion])

  const { isFetching, hasError } = useApi({ callApi: getCountries })

  return (
    <div className="home">
      <section className="home__filters">
        <section className="home__filters__search-input">
          <Input
            icon={<Search />}
            placeholder="Search for a country..."
            value={searchCountry}
            onChange={handleChangeSearchCountry}
          />
        </section>
        <section className="home__filters__region-dropdown">
          <Dropdown
            label={"Filter by Region"}
            onSelect={(value) => handleSelectRegion(value as Regions)}
            options={[...REGIONS]}
          />
        </section>
      </section>
      {isFetching ? (
        <SpinnerLoading />
      ) : hasError ? (
        <h2>An error occurred while obtaining the countries.</h2>
      ) : countries.length > 0 ? (
        <section className="home__countries-list">
          {countries.map((country) => (
            <LinkCountryCard
              key={`${country.name}-${country.cca3}`}
              {...country}
            />
          ))}
        </section>
      ) : (
        <h2>No countries found.</h2>
      )}
    </div>
  )

  function handleSelectRegion(region: Regions) {
    setRegion(region)
    setSearchCountry((prevState) => (prevState === "" ? prevState : ""))
  }

  function handleChangeSearchCountry(value: string) {
    setSearchCountry(value)
    setRegion((prevState) => (prevState === "Todas" ? prevState : "Todas"))
  }
}
