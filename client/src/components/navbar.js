import React from 'react';
import { Link } from "react-router-dom";
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';

const Nav = () => {
    return (
        <div>
            <Navbar id="navbar">
                <Container>
                    <Navbar.Brand href="#home">moment</Navbar.Brand>
                    <Navbar.Toggle />
                    <Navbar.Collapse className="justify-content-end">
                        <div id="nav-buttons">
                            <button class="solid btn btn-primary btn-md">Create group</button>
                            <button class="solid btn btn-primary btn-md green">Join Group</button>
                        </div>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    );
}
export default Nav;