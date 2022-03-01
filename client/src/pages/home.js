import React from 'react';
import "./home.css";
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';

const Home = () => {
    return (
        <div>
            <div class="brand">
            <h1>moment</h1>
            <p>prompt with your team!</p>
            </div>
            <ul class="list-group container-fluid">
                <li class="list-group-item table-title">Groups for You</li>
                <li class="list-group-item">+ Create a Group</li>
                <li class="list-group-item">Informatics Capstone</li>
                <li class="list-group-item">Group 2</li>
                <li class="list-group-item">Group 3</li>
            </ul>
        </div>
    );
}
export default Home;