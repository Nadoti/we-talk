import { Link } from "react-router-dom"
import styles from "./register.module.css"



export function Register() {

  return (
    <div className={styles.container}>
      <Link to='/user/login'>LOGIN</Link>
      <div className={styles.login}>REGISTER</div>
    </div>
  )
}