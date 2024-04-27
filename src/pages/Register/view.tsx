import { Link } from "react-router-dom"
import styles from "./register.module.css"
import { Logo } from "../../components/Logo"
import { Input } from "../../components/Forms/Input"
import { Button } from "../../components/Forms/Button"
import { useRegisterModel } from "./model"


export function RegisterView({
  handleRegister, 
  handleSubmit, 
  errors, 
  register,
  loading
}: ReturnType<typeof useRegisterModel>) {

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.logo}>
          <Logo />
        </div>
        <div className={styles.body}>
          <h1 className={styles.title}>Cadastrar</h1>
          <form className={styles.form} onSubmit={handleSubmit(handleRegister)}>
            <Input label="Nome" type="text" {...register("name")} error={errors.name?.message}/>
            <Input label="E-mail" type="email" {...register("email")} error={errors.email?.message}/>
            <Input label="Senha" type="password" {...register("password")} error={errors.password?.message}/>
            <Input type="file" {...register("file")} />
            <Button type="submit" disabled={loading}>Cadastrar</Button>
          </form>
          <div className={styles["nav-container"]}>
            <p className={styles.nav}>Já possui cadastro? clique <Link to="/user/login">aqui</Link></p>
          </div>
        </div>
      </div>
    </div>
  )
}