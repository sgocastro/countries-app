export type CountryData = {
  name: string
  cca3: string
  population: number
  region: string
  capital: Array<string>
  flags: {
    png: string
    alt: string
    svg?: string
  }
  nativeName: Array<string>
  subregion: string
  tld: Array<string>
  languages: Array<string>
  currencies: Array<string>
  borders: Array<string>
}
