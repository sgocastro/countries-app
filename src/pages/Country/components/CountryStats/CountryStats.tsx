import { COUNTRY_DATA_PARSER, Stat } from "../../../../helpers"
import { CountryInformation } from "../../Country"

import "./styles.css"

type CountryStatsProps = {
  stats: string[]
  countryInformation: CountryInformation
}

export const CountryStats: React.FC<CountryStatsProps> = ({
  stats,
  countryInformation,
}) => {
  return (
    <section className={`country-information-stats`}>
      {stats.map((key) => (
        <p key={key} className="country-information-stats__stat">
          <span className="country-information-stats__stat__title">
            {COUNTRY_DATA_PARSER[key as Stat].description}:{" "}
          </span>
          {COUNTRY_DATA_PARSER[key as Stat].parserData(
            countryInformation[key as keyof Omit<CountryInformation, "flags">]
          )}
        </p>
      ))}
    </section>
  )
}
