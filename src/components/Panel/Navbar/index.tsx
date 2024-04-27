import { LogOut, MessagesSquare, Settings, UsersRound } from "lucide-react"
import { NavLink, useNavigate } from "react-router-dom"
import styles from "./navbar.module.css"
import { auth } from "../../../firebase/firebase"
import { useUserStore } from "../../../store/userStore"



export function Navbar() {
  const navigate = useNavigate()
  const { currentUser } = useUserStore()
  return (
    <aside className={styles.container}>
      <span className={styles.logo}>
        We-Talk
      </span>
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
            to="users"
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
        <button className={styles.logOut} onClick={() => {
          auth.signOut()
          navigate("/user/login")
        }}><LogOut /></button>
      </ul>
      <div className={styles.containerImage}>
        <img src={currentUser.photoURL} alt="photo" />
      </div>
    </aside>
  )
}