import { Link } from "react-router-dom"
import styles from "./login.module.css"
import { Logo } from "../../components/Logo"
import { Input } from "../../components/Forms/Input"
import { Button } from "../../components/Forms/Button"



export function Login() {

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.logo}>
          <Logo />
        </div>
        <div className={styles.body}>
          <h1 className={styles.title}>Login</h1>
          <form className={styles.form}>
            <Input label="E-mail" type="email"/>
            <Input label="Senha" type="password"/>
            <Button type="submit">Entrar</Button>
          </form>
          <div className={styles["nav-container"]}>
            <p className={styles.nav}>Esqueceu Senha? clique <Link to="/user/forget">aqui</Link></p>
            <p className={styles.nav}>Não é cadastrado? clique <Link to="/user/register">aqui</Link></p>
          </div>
        </div>
      </div>
    </div>
  )
}