import styles from "./input.module.css"

type InputProps = React.ComponentProps<'input'> & {
  label: string;
}; 

export function Input({label, ...props }: InputProps) {

  return (
    <div className={styles.container}>
      <input 
        className={styles.input}
        {...props}
        required
      />
      <label className={styles.label}>{label}</label>
    </div>
  )
}