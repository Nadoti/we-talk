import { InputHTMLAttributes, forwardRef } from "react";
import styles from "./input.module.css"

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(({ label, error, ...rest }, ref) => {

  return (
    <div className={styles.container}>
      <input 
        className={styles.input}
        ref={ref}
        placeholder={label}
        {...rest}
      />
      <label className={styles.label} >{label}</label>
      {error && <span className={styles.error}>{error}</span>}
    </div>
  )
})