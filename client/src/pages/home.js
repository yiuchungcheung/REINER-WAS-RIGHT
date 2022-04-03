import React from 'react';
import "./home.css";


const Home = () => {

    // want to redirect them to /prompt?group1, /prompt?group2 etc. but need to get name of the group
    function redirectGroupPrompt(props) {
        // console.log(document.getElementById("test"));
        // console.log(props);
        // window.location.assign("/" + props.route);
        window.location.assign("/prompt");
    }

    function redirectToCreate(props) {
        // console.log(document.getElementById("test"));
        // console.log(props);
        // window.location.assign("/" + props.route);
        window.location.assign("/create");
    }

    // when groups are created, add ID tag to each created group


    return (
        <div>
            <div class="brand">
            <h1>moment</h1>
            <p>prompt with your team!</p>
            </div>

            <ul class="list-group container-fluid">
                <li class="list-group-item table-title">Groups for You</li>
                <li class="list-group-item" onClick={redirectToCreate}>+ create a group</li>
                <li class="list-group-item" id="test" route="/prompt" onClick={redirectGroupPrompt}>Informatics Capstone</li>
                <li class="list-group-item">Group 2</li>
                <li class="list-group-item">Group 3</li>
            </ul>
         </div>
    );
}
export default Home;