import React from 'react';
import "./splash.css";

const Splash = () => {
    return (
        <div>
            <header>
            <h1>moment</h1>
            <p>prompt with your team!</p>
            <div class="logon">
                <button class="solid btn btn-primary btn-md">Log in</button>
                <button class="outline btn btn-outline-primary btn-md">Sign Up</button>
            </div>
            </header>
        </div>
    );
}
export default Splash;