import styles from "./button.module.css"
type ButtonProps = React.ComponentProps<'button'> & {
  disabled: boolean
}

export function Button({children, disabled}: ButtonProps) {

  return (
    <button disabled={disabled} className={styles.btn}>
      {children}
    </button>
  )
}