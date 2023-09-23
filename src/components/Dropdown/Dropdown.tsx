import "./styles.css"
import { FC, useState } from "react"
import { ChevronDown } from "../../icons"

type DropdownProps = {
  label: string
  onSelect: (value: string) => void
  options: Array<string>
}

export const Dropdown: FC<DropdownProps> = ({ label, onSelect, options }) => {
  const [showOptions, setShowOptions] = useState(false)

  return (
    <div className="dropdown-container">
      <section className="dropdown-container__selected">
        {label && <label>{label}</label>}
        <button
          type="button"
          className="dropdown-container__show-options-btn"
          onClick={toggleShowOptions}
        >
          <ChevronDown width="1.2rem" />
        </button>
      </section>
      {showOptions ? (
        <section className="dropdown-container__options">
          {options.length ? (
            <ul className="dropdown-container__options__list">
              {options.map((option, index) => (
                <li
                  key={`${option}-${index}`}
                  onClick={() => handleSelectOption(option)}
                  className="dropdown-container__list__option"
                >
                  {option}
                </li>
              ))}
            </ul>
          ) : (
            <p>No hay opciones para mostrar</p>
          )}
        </section>
      ) : null}
    </div>
  )

  function toggleShowOptions() {
    setShowOptions((prev) => !prev)
  }

  function handleSelectOption(value: string) {
    onSelect(value)
    toggleShowOptions()
  }
}
