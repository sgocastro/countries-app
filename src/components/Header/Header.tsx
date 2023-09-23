import { Link } from "wouter"
import { DarkMode } from "../../icons"
import "./styles.css"

export const Header: React.FC<{}> = () => {
  return (
    <header>
      <Link to="/">
        <button className="header__navigation__home-link-btn">
          <h1 className="header__title">Where in the world?</h1>
        </button>
      </Link>
      <button className="header__dark-mode-button">
        <DarkMode />
        Dark Mode
      </button>
    </header>
  )
}
