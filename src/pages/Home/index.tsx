import { Route, Routes } from "react-router-dom";
import { Login } from "../Login";
import { Register } from "../Register";
import styles from "./home.module.css"
import { PageError } from "../Error";

export function Home() {

  return (
    <section className={styles.container}>
      <div className={styles.forms}>
        <Routes>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="*" element={<PageError />} />
        </Routes>
      </div>
    </section>
  )
}