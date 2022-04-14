import React from 'react';
import "./home.css";
import { getAuth } from "firebase/auth";


const Home = () => {

    const auth = getAuth();
    const user = auth.currentUser;

    // want to redirect them to /prompt?group1, /prompt?group2 etc. but need to get name of the group
    function redirectGroup(route) {
        window.location.assign(route);
    }



    return (
        <div>
            <div class="brand">
                <h1>moment</h1>
                <p>prompt with your team!</p>
            </div>

            <ul class="list-group container-fluid">
                <li class="list-group-item table-title" >Groups for You</li>
                <li class="list-group-item" onClick={() => {redirectGroup("/create");}}>+ create a group</li>

                {/* when groups are created, add ID tag to each created group */}
                {/* adding ? after /prompt to direct to dediated group prompt interface using the group's ID*/}
                <li class="list-group-item" id="informatics-capstone" onClick={(e) => {redirectGroup("/prompt?" + e.currentTarget.id);}}>Informatics Capstone</li>
                <li class="list-group-item">Group 2</li>
                <li class="list-group-item">Group 3</li>
            </ul>
        </div>
    );
}
export default Home;