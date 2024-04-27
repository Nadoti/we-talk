import { Link } from "react-router-dom"
import styles from "./login.module.css"
import { Logo } from "../../components/Logo"
import { Input } from "../../components/Forms/Input"
import { Button } from "../../components/Forms/Button"
import { useLoginModel } from "./model"

export function LoginView({ 
  handleSubmit,
  handleLogin,
  errors,
  register,
  loading
}:ReturnType<typeof useLoginModel>) {
  
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.logo}>
          <Logo />
        </div>
        <div className={styles.body}>
          <h1 className={styles.title}>Login</h1>
          <form className={styles.form} onSubmit={handleSubmit(handleLogin)}>
            <Input label="E-mail"  type="email" {...register("email")} error={errors.email?.message}/>
            <Input label="Senha" type="password" {...register("password")} error={errors.password?.message}/>
            <Button type="submit" disabled={loading}>Entrar</Button>
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