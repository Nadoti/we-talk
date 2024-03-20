import {BrowserRouter, Routes, Route  } from "react-router-dom"
import { Home } from "../pages/Home"
import { PageError } from "../pages/Error"
import { Panel } from "../pages/Panel"



export function Router() {


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