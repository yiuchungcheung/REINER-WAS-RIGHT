import Home from "./pages/home";
import Create from "./pages/create";
import Splash from "./pages/splash.js";
import Nav from "././components/navbar";
import Login from "./pages/login";
import Signup from "./pages/signup";
import Prompt from "./pages/prompt";
import Profile from "./pages/profile";
import HistoryPrompt from "./pages/history";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Nav />
        <div class="body">
          <Routes>
            <Route exact path="/" element={<Splash />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/create" element={<Create />} />
            <Route path="/prompt" element={<Prompt />} />
            <Route path="/history" element={<HistoryPrompt />} />
          </Routes>
        </div>
      </div>
    </Router>

  );
}

export default App;
