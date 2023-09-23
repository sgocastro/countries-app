import { Link } from "wouter"
import "./styles.css"
import { CountryCardInformation } from "../../Home"
import { COUNTRY_DATA_PARSER } from "../../../../helpers"

export const LinkCountryCard = ({
  cca3,
  flags,
  name,
  ...props
}: CountryCardInformation): JSX.Element => {
  return (
    <Link href={`/country/${cca3}`}>
      <article className="link-country-card">
        <img
          src={flags.png}
          alt={flags.alt == "" ? name : flags.alt}
          width="100%"
          height={140}
          loading="lazy"
          className="link-country-card__flag"
        />
        <section className="link-country-card__information">
          <h2 className="link-country-card__information__name">{name}</h2>
          <ul>
            <li>
              <span className="link-country-card__information__stat">
                {COUNTRY_DATA_PARSER.population.description}:
              </span>{" "}
              {COUNTRY_DATA_PARSER.population.parserData(props.population)}
            </li>
            <li>
              <span className="link-country-card__information__stat">
                {COUNTRY_DATA_PARSER.region.description}:
              </span>{" "}
              {COUNTRY_DATA_PARSER.region.parserData(props.region)}
            </li>
            <li>
              <span className="link-country-card__information__stat">
                {COUNTRY_DATA_PARSER.capital.description}:
              </span>{" "}
              {COUNTRY_DATA_PARSER.capital.parserData(props.capital)}
            </li>
          </ul>
        </section>
      </article>
    </Link>
  )
}
