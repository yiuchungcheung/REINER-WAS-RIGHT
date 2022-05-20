import React from 'react';
import "./splash.css";
import { useNavigate } from 'react-router-dom';



// function handleClick () {
//     window.location.assign("/home");
//     //this opens in a new tab (believe that is what the owner of the question wanted if not you can do window.location.href = "/insert/your/path/here".
//   }

  function redirectGroup(route) {
    window.location.assign(route);
}

const Splash = () => {
    return (
        <div>
            <header>
            <section id="hero"> </section>
            <h1>moment</h1>
            <p>prompt with your team!</p>
            <div class="logon">
                <button class="solid btn btn-primary btn-md" onClick={(e) => {redirectGroup("/login");}} >Log in</button>
                <button class="outline btn btn-outline-primary btn-md" onClick={(e) => {redirectGroup("/signup");}}>Sign Up</button>
            </div>
            </header>
        </div>
    );
}


export default Splash;