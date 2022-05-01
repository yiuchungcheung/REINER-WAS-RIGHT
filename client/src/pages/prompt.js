import React from 'react';
import { getDatabase,ref, onValue } from 'firebase/database';
import {getAuth} from 'firebase/auth';
import "./prompt.css";


const Prompt = () => {
    // db reference
    const db = getDatabase();
    const dbRef = ref(db, 'groups');

    const groupMap = {}; // maps (firebase) unique id to the group's room code (key: group room code; value: firebase unique id)
    const roomCode = 'pkfkd'; // CHANGE LATER

    // user info
    const auth = getAuth();
    const user = auth.currentUser;

    // current date
    const current = new Date();
    const date = `${current.getMonth() + 1}/${current.getDate()}/${current.getFullYear()}`;

    // will need to change this to random prompts 
    const prompt = "Would you like to be famous? In what way?";

    // function that submits the user response
    function submitResponse() {
    }

    onValue(dbRef, (snapshot) => {
        const data = snapshot.val();
        let thisGroupKey;
        // populate set of valid, existing room codes
        for (var key in data) {
            if (data.hasOwnProperty(key)) {
                const curGroup = data[key];
                for (var groupKey in curGroup) {
                    if (curGroup.hasOwnProperty(groupKey) && groupKey == 'g_id' && curGroup[groupKey] == roomCode) { // get current room's data
                        thisGroupKey = key;
                        break;
                    }
                }
                if (thisGroupKey != undefined) {
                    break;
                }
            }
        }
        // get today's question, if applicable

        const history = data[thisGroupKey]["history"];
        console.log(history);
        let todaysPrompt = false;
        for (let key in history) {
            if (history.hasOwnProperty(key) && history[key] == 'date') {
                if (history) {
                    
                }
            }
        }
    });

    return (
        <div>
            <h1>Group Name</h1>
            <h2>Room Code: {}</h2>
            <div>
                <ul class="list-group container-fluid">
                    <h2>Today's Prompt</h2>
                    <p>{date}</p>
                    <li class="list-group-item">{prompt}</li>
                    {/* <div class="collapse" id="collapseExample">
                        <div class="card list-group-item card-body">
                            Some placeholder content for the collapse component.
                        </div>
                    </div> */}
                    <textarea class="form-control list-group-item" id="exampleFormControlTextarea1" rows="3"></textarea>
                    {/* <li class="btn list-group-item reply" data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">Submit Response</li> */}
                    <li class="list-group-item reply" onClick={submitResponse}>Submit Response</li>
                </ul>

                <div>No one has submitted yet. Be the first one! </div>
            </div>

        </div>
    );
}


export default Prompt;