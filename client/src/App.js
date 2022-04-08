import Home from "./pages/home";
import Create from "./pages/create";
import Splash from "./pages/splash.js";
import Nav from "././components/navbar";
import Login from "./pages/login";
import Signup from "./pages/signup";
import Prompt from "./pages/prompt";
import { Container } from 'react-bootstrap';
import Profile from "./pages/profile";
import HistoryPrompt from "./pages/history";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import { AuthProvider } from './context/AuthContext'

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Nav />
          <div class="body">
            <Routes>
              <Route exact path="/" element={<Splash />} />
              <Route path="/signup" element={<Container className="d-flex align-items-center justify-content-center"
                style={{ minHeight: "100vh" }}>

                <div className="w-100" style={{ maxWidth: "400px" }}>
                  <Signup />
                </div>

              </Container>} />
              {/* <Route path="/signup" element={<Signup />} /> */}
              <Route path="/login" element={<Login />} />
              <Route path="/home" element={<Home />} />
              <Route path="/create" element={<Create />} />
              <Route path="/prompt" element={<Prompt />} />
              <Route path="/history" element={<HistoryPrompt />} />
            </Routes>
          </div>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
