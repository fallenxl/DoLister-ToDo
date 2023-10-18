import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import Login from "./pages/auth/Login"
import Register from "./pages/auth/Register"
import { PrivateRoutes, PublicRoutes } from "./constants/routes"
import { AuthGuard } from "./guards"
import Home from "./pages/home/Home"
function App() {

  return (
   <Router>
    <Routes>
      <Route path={PublicRoutes.LOGIN} element={<Login/>} />
      <Route path={PublicRoutes.REGISTER} element={<Register/>} />
      <Route path={'/'} element={<Navigate replace to={PrivateRoutes.HOME} />} />
      <Route element={<AuthGuard/>}>
        <Route path={PrivateRoutes.HOME} element={<Home/>} />
      </Route>
      <Route path="*" element={<Navigate replace to={PrivateRoutes.HOME} />} />
    </Routes>
   </Router>
  )
}

export default App
