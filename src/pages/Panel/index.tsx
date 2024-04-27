import { Route, Routes } from "react-router-dom";
import { Navbar } from "../../components/Panel/Navbar";
import styles from "./panel.module.css"
import { PanelChat } from "./PanelChat";
import { Chat } from "../../components/Panel/Chat";
import { InfoUser } from "../../components/Panel/InfoUser";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase/firebase";
import { PanelAllUsers } from "./PanelAllUsers";
import { useChatStore } from "../../store/chatStore";


export function Panel() {
  const { user } = useChatStore()
  return (
    <div className={styles.container}>
      <Navbar />
      <div className={styles.contentRoutes}>
        <Routes>
          <Route path="chat" element={<PanelChat />}/>
          <Route path="users" element={<PanelAllUsers />}/>
        </Routes>
      </div>
      {user && <Chat />}
      {/* <InfoUser /> */}
    </div>
  )
}