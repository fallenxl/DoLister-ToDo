import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Login from "./pages/auth/Login"
import Register from "./pages/auth/Register"
function App() {

  return (
   <Router>
    <Routes>
      <Route path="/login" element={<Login/>} />
      <Route path="/register" element={<Register/>} />
      <Route path="/" element={<h1>Home</h1>} />
    </Routes>
   </Router>
  )
}

export default App
