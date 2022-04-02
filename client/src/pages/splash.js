import React from 'react';
import "./splash.css";
import { useNavigate } from 'react-router-dom';



function handleClick () {
    window.location.assign("/home");
    //this opens in a new tab (believe that is what the owner of the question wanted if not you can do window.location.href = "/insert/your/path/here". 
  } 

const Splash = () => {
    return (
        <div>
            <header>
            <h1>moment</h1>
            <p>prompt with your team!</p>
            <div class="logon">
                <button class="solid btn btn-primary btn-md" onClick={handleClick} >Log in</button>
                <button class="outline btn btn-outline-primary btn-md">Sign Up</button>
            </div>
            </header>
        </div>
    );
}


export default Splash;