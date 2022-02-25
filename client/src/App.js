import logo from "./logo.svg";
import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Home from "./pages/home";
import Create from "./pages/create";
import Join from "./pages/join";
import Splash from "./pages/splash.js";
import Nav from "././components/navbar";
import Profile from "./pages/profile";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <div className="App">
      {/* <Router>
        <navbarr></navbarr>
        <Routes>
          <Route path='/' exact component={Home} />
          <Route path='/create' component={Create} />
          <Route path='/join' component={Join} />
          <Route path='/profile' component={Profile} />
        </Routes>
      </Router>
      <div class="nav"><navbar><button>Join</button><button>Create</button></navbar></div> */}
      <Navbar id="navbar">
        <Container>
          <Navbar.Brand href="#home">moment</Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            {/* <button>
              <a href="#join">Join</a>
            </button>
            <button>
              <a href="#create">Create</a>
            </button> */}
            <div id="nav-buttons">
            <button class="solid btn btn-primary btn-md">create group</button>
            <button class="solid btn btn-primary btn-md green">Join Group</button>
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Splash />
      {/* <Nav /> */}
      {/* <div>
            <header>
            <h1>moment</h1>
            <p>prompt with your team!</p>
            </header>
        </div> */}
      {/* <header className="App-header">
        <img src={logo} className="App-logo"
          alt="logo" />
        <h1>moment</h1>
        <Button variant="primary">log in</Button>

        <p>A simple React app.....</p>

        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <form action="../../post" method="post"
          className="form">
          <button type="submit">Connected?</button>
        </form>
      </header> */}
    </div>


  );
}

export default App;
