import styles from "./panel-chat.module.css"

export function PanelChat() {

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Chat</h1>
      <div className={styles.content}>
        <div className={styles.subgroup}>
          <h2 className={styles.subtitle}>Contatos</h2>
          <div className={styles.contacts}>
            <button className={styles.containerContacts}>
              <img src="https://images.unsplash.com/photo-1710432157519-e437027d2e8f?q=80&w=2731&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" className={styles.photo} />
              <span className={styles.wrapperContacts}>
                <h3 className={styles.name}>João</h3>
                <p className={styles.message}>Olá, como você está? tudo bem com você?</p>
              </span>
              <span className={styles.infoMessages}>
                <p className={styles.time}>4m</p>
                <span className={styles.quantity}>3</span>
              </span>
            </button>
          </div>

        </div>
        <div className={styles.subgroup}>
          <h2 className={styles.subtitle}>Grupos</h2>
          <div className={styles.contacts}>
            <button className={styles.containerContacts}>
              <img src="https://images.unsplash.com/photo-1710432157519-e437027d2e8f?q=80&w=2731&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" className={styles.photo} />
              <span className={styles.wrapperContacts}>
                <h3 className={styles.name}>João</h3>
                <p className={styles.message}>Olá, como você está? tudo bem com você?</p>
              </span>
              <span className={styles.infoMessages}>
                <p className={styles.time}>4m</p>
                <span className={styles.quantity}>3</span>
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}