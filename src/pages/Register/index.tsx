import { Link } from "react-router-dom"
import styles from "./register.module.css"
import { Logo } from "../../components/Logo"
import { Input } from "../../components/Forms/Input"
import { Button } from "../../components/Forms/Button"



export function Register() {

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.logo}>
          <Logo />
        </div>
        <div className={styles.body}>
          <h1 className={styles.title}>Cadastrar</h1>
          <form className={styles.form}>
            <Input label="Nome" type="text"/>
            <Input label="E-mail" type="email"/>
            <Input label="Senha" type="password"/>
            <Button type="submit">Cadastrar</Button>
          </form>
          <div className={styles["nav-container"]}>
            <p className={styles.nav}>Já possui cadastro? clique <Link to="/user/login">aqui</Link></p>
          </div>
        </div>
      </div>
    </div>
  )
}