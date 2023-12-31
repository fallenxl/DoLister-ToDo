import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./pages/home/Home";
function App() {

  return (
    <Router>
      <Routes>
        <Route path={'/'} element={<Home />} />

        <Route
          path="*"
          element={<Navigate replace to={'/'} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
