import { Container } from "react-bootstrap";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import AppNavbar from "./components/AppNavbar";
import { MovieProvider } from "./context/MovieContext";
import { UserProvider } from "./context/UserContext";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import Movies from "./pages/Movies";
import Register from "./pages/Register";

function App() {
  return (
    <UserProvider>
      <MovieProvider>
        <Router>
          <AppNavbar />
          <Container>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/logout" element={<Logout />} />
              <Route path="/movies" element={<Movies />} />
            </Routes>
          </Container>
        </Router>
      </MovieProvider>
    </UserProvider>
  );
}

export default App;
