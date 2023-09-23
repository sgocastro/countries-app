import { FC } from "react"
import "./styles.css"

type InputProps = {
  placeholder?: string
  value: string
  onChange: (value: string) => void
  icon?: import("react").ReactNode
}

export const Input: FC<InputProps> = ({
  placeholder,
  icon,
  value,
  onChange,
}) => {
  return (
    <div className="input-container">
      {icon}
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  )
}
