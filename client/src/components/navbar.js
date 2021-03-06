import React from 'react';
import { Link } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import { auth } from '../firebase';
import { getAuth, signOut } from "firebase/auth";


const Nav = () => {

    function logout() {
        const auth = getAuth();

        const currentUser = auth.currentUser;

        signOut(auth).then(() => {
            console.log('sign out ' + currentUser.uid + ' successful.')
          }).catch((error) => {
            console.log(error.code);
            console.log(error.message);
          });

        window.location.replace("https://yejukim.github.io/moment.github.io/");
    }
    return (

        <div>

            <div class="container">
                <nav class="navbar navbar-expand-lg navbar-light">
                    <a class="navbar-brand" href="/home">moment</a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarNav">
                        <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
                        <div id="nav-buttons">
                        <li class="nav-item"><a href="/create" class="solid btn btn-primary btn-md mr-5"  role="button" aria-disabled="true">Create Group</a></li>
                        <li class="nav-item"><a href="/join" class="solid btn btn-secondary btn-md green" role="button" aria-disabled="true">Join Group</a></li>
                        <li class="nav-item"><a class="nav-link" onClick={() => {window.location.replace("https://yejukim.github.io/moment.github.io/")}}>Splash Page</a></li>
                        <li class="nav-item"><a class="nav-link" onClick={logout}>Logout</a></li>
                        </div>
                        </ul>
                    </div>
                </nav>
                </div>
        </div>
    );
}
export default Nav;
