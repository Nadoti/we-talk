import styles from "./button.module.css"
type ButtonProps = React.ComponentProps<'button'>

export function Button({children}: ButtonProps) {

  return (
    <button className={styles.btn}>
      {children}
    </button>
  )
}