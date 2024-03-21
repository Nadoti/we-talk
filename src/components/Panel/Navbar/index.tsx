import { NavLink } from "react-router-dom"
import { Logo } from "../../Logo"
import styles from "./navbar.module.css"
import { LogOut, MessagesSquare, Settings, UsersRound } from "lucide-react"



export function Navbar() {
  
  return (
    <aside className={styles.container}>
      <Logo />
      <ul className={styles.listNav}>
        <li className={styles.nav}>
          <NavLink 
            className={({ isActive }) =>
              isActive ? `${styles.link} ${styles.active}` : styles.link
            }
            to="chat"
          >
            <MessagesSquare />
          </NavLink>
        </li>
        <li className={styles.nav}>
        <NavLink 
            className={({ isActive }) =>
              isActive ? `${styles.link} ${styles.active}` : styles.link
            }
            to="groups"
          >
            <UsersRound />
          </NavLink>
        </li>
        <li className={styles.nav}>
        <NavLink 
            className={({ isActive }) =>
              isActive ? `${styles.link} ${styles.active}` : styles.link
            }
            to="settings"
          >
            <Settings />
          </NavLink>
        </li>
        <button className={styles.logOut}><LogOut /></button>
      </ul>
      <div className={styles.containerImage}>
        <img src="https://images.unsplash.com/photo-1710432157519-e437027d2e8f?q=80&w=2731&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
      </div>
    </aside>
  )
}