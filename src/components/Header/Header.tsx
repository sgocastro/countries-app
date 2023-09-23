import "./styles.css"
import { Link } from "wouter"
import { DarkMode } from "../../icons"
import { FC, useEffect } from "react"

export const Header: FC = () => {
  useEffect(() => {
    const themeLocalStorage = localStorage.getItem("theme")

    if (themeLocalStorage == null) {
      localStorage.setItem("theme", "dark")
      document.documentElement.classList.add("dark")
      return
    }

    document.documentElement.classList.add(themeLocalStorage)
  }, [])

  return (
    <header>
      <Link to="/">
        <button className="header__navigation__home-link-btn">
          <h1 className="header__title">Where in the world?</h1>
        </button>
      </Link>
      <button className="header__dark-mode-button" onClick={toggleDarkMode}>
        <DarkMode />
        Dark Mode
      </button>
    </header>
  )

  function toggleDarkMode() {
    if (document.documentElement.classList.contains("light")) {
      document.documentElement.classList.remove("light")
      document.documentElement.classList.add("dark")
      localStorage.setItem("theme", "dark")
    } else if (document.documentElement.classList.contains("dark")) {
      document.documentElement.classList.remove("dark")
      document.documentElement.classList.add("light")
      localStorage.setItem("theme", "light")
    }
  }
}
