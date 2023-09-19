import { Country } from "../../types"
import "./styles.css"

export const LinkCountryCard = ({
  name,
  capital,
  flags,
  population,
  region,
}: Country): JSX.Element => {
  return (
    <a href={`#`}>
      <article className="link-country-card">
        <img
          src={flags.png}
          alt={name.common}
          width="100%"
          height={140}
          loading="lazy"
          className="link-country-card__flag"
        />
        <section className="link-country-card__information">
          <h2 className="link-country-card__information__name">
            {name.common}
          </h2>
          <ul>
            <li>
              <span className="link-country-card__information__stat">
                Population:
              </span>{" "}
              {population.toLocaleString("es-AR")}
            </li>
            <li>
              <span className="link-country-card__information__stat">
                Region:
              </span>{" "}
              {region}
            </li>
            <li>
              <span className="link-country-card__information__stat">
                Capital:
              </span>{" "}
              {capital}
            </li>
          </ul>
        </section>
      </article>
    </a>
  )
}
