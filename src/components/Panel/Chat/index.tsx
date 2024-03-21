import { Cog, Send, Video } from "lucide-react"
import styles from "./chat.module.css"

export function Chat() {

  return (
    <section className={styles.container}>
      <div className={styles.header}>
        <div className={styles.user}>
          <img src="https://images.unsplash.com/photo-1710432157519-e437027d2e8f?q=80&w=2731&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" className={styles.photo} />
          <p className={styles.name}>João</p>
        </div>
        <div className={styles.actions}>
          <button className={styles.buttonAction}>
            <Video />
          </button>
          <button className={styles.buttonAction}>
            <Cog />
          </button>
        </div>
      </div>
      <div className={styles.chatContainer}>
        CHAT
      </div>
      <form className={styles.footer}>
        <input className={styles.inputChat} type="text" placeholder="Write a text" />
        <button className={styles.send}><Send />Send</button>
      </form>
    </section>
  )
}