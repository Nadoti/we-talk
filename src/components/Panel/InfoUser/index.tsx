import { X } from "lucide-react"
import styles from "./info-user.module.css"

export function InfoUser() {

  return (
    <aside className={styles.container}>
      <button className={styles.closeModal}><X /></button>
      <div className={styles.userInfo}>
        <img src="https://images.unsplash.com/photo-1710432157519-e437027d2e8f?q=80&w=2731&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" className={styles.photo} />
        <p className={styles.name}>João Silva</p>
        <p className={styles.email}>joao_silva@hotmail.com</p>
      </div>
    </aside>
  )
}