import React from 'react';
import { getDatabase,ref, onValue } from 'firebase/database';
import {getAuth} from 'firebase/auth';
import "./prompt.css";


const Prompt = () => {
    // db reference
    const db = getDatabase();
    const dbRef = ref(db, 'groups');
    const questionRef = ref(db, 'questions');

    const roomCode = 'pkfkd'; // CHANGE LATER
    const questionList = [];

    // user info
    const auth = getAuth();
    const user = auth.currentUser;
    let thisGroupKey;
    let roomData;

    // current date
    const current = new Date();
    const date = `${current.getMonth() + 1}/${current.getDate()}/${current.getFullYear()}`;
    // console.log("TODAY = " + date);

    // will need to change this to random prompts 
    let prompt;// = "Would you like to be famous? In what way?";

    // function that submits the user response
    function submitResponse() {
    }

    // get questions
    onValue(questionRef, (snapshot) => {
        const data = snapshot.val();
        for (let key in data) {
            if (data.hasOwnProperty(key)) { // each question object
                const questionObj = data[key];
                for (let field in questionObj) {
                    if (field == 'question') {
                        questionList.push(questionObj[field]);
                    }
                }
            }
        }
    }, {
        onlyOnce: true
    });

    function updateRoomData(data) {
        roomData = data;
        console.log(roomData);
    }

    // get current room data
    onValue(dbRef, (snapshot) => {
        const data = snapshot.val();
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

        if (!todaysQuestionExists(data, thisGroupKey)) {
            const rand = Math.floor(Math.random() * questionList.length);
            console.log(rand);
            prompt = questionList[rand];
        }
    }, {
        onlyOnce: true
    });

    function updatePrompt (p) {
        prompt = p;
        console.log(prompt);
    }

    function todaysQuestionExists(data, groupKey) {
        const history = data[groupKey]["history"];
        console.log(history);
        for (let key in history) {
            if (history.hasOwnProperty(key)) { // each history entry; one day
                const curDay = history[key];
                for (let data in curDay) { // data = date or question
                    if (data == 'date' && curDay[data] == date) {
                        prompt = curDay['question'];
                        return true;
                    }

                }
            }
        }
        return false;
    }

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