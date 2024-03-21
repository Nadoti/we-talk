import { Route, Routes } from "react-router-dom";
import { Navbar } from "../../components/Panel/Navbar";
import styles from "./panel.module.css"
import { PanelChat } from "./PanelChat";
import { Chat } from "../../components/Panel/Chat";


export function Panel() {

  return (
    <div className={styles.container}>
      <Navbar />
      <div className={styles.contentRoutes}>
        <Routes>
          <Route path="chat" element={<PanelChat />}/>
        </Routes>
      </div>
      <Chat />
    </div>
  )
}