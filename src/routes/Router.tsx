import {BrowserRouter, Routes, Route  } from "react-router-dom"
import { Home } from "../pages/Home"
import { PageError } from "../pages/Error"
import { Panel } from "../pages/Panel"
import { useUserStore } from "../store/userStore"
import { useEffect } from "react"
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "../firebase/firebase"



export function Router() {

  const {currentUser, fetchUserInfo} = useUserStore()

  useEffect(() => {
    const unSub = onAuthStateChanged(auth, (user) => {
      console.log("UID",user)
      fetchUserInfo(user?.uid)
    })

    return () => {
      unSub()
    }
  },[fetchUserInfo])
    
  return (
    <BrowserRouter>
      <Routes>
        <Route path="user/*" element={<Home />} />
        <Route path="*" element={<PageError />} />

        <Route path="/panel/*" element={<Panel />} >
        {/* <Route path="/panel/chat" element={<PanelChat />}/>
        <Route path="/panel/procurar-usuarios" element={<PanelSearchUser />}/>
        <Route path="/panel/conta" element={<PanelSettings />}/> */}
        </Route>
      </Routes>
    </BrowserRouter>
  )
}