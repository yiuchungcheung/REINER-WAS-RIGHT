import React from 'react';
import { Link } from "react-router-dom";
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';

const Nav = () => {
    return (
        
        <div>
                <nav class="navbar navbar-expand-lg navbar-light">
                <Container>
                    <Navbar.Brand href="/home">moment</Navbar.Brand>
                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarNav">
                        <ul class="navbar-nav">
                        <div id="nav-buttons">
                            <button class="solid btn btn-primary btn-md">Create group</button>
                            <button class="solid btn btn-primary btn-md green">Join Group</button>
                        </div>
                        </ul>
                    </div>
                </Container>
                </nav>
        </div>
    );
}
export default Nav;
