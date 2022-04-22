import { getDatabase, ref, set, onValue } from 'firebase/database';
import { getAuth } from "firebase/auth";
import React from 'react';
import "./prompt.css";


const Prompt = () => {
    // user information
    const auth = getAuth();
    const user = auth.currentUser;

    // db reference
    const db = getDatabase();
    const dbRef = ref(db, 'questions');

    if (user) {
        console.log('user successfully logged in ' + user.uid);
    } else {
        console.log('no user signed in');
    }

    const questionBank = [];

    onValue(dbRef, (snapshot) => {
        const data = snapshot.val();
        // console.log(data);
        populateQuestions(data);
      });

    const todaysQuestion = selectDailyQuestion();

    function populateQuestions(data) {
        for (var key in Object.keys(data)) {
            questionBank.push(data[key]['question']);
        }
    }

    function selectDailyQuestion() {
        const rand = Math.floor(Math.random() * questionBank.length);
        console.log(rand);
        console.log("today's question: " + questionBank[rand]);
        return questionBank[rand];
    }

    const currentDate = new Date();
    const date = `${currentDate.getMonth() + 1}/${currentDate.getDate()}/${currentDate.getFullYear()}`;

    // will need to change this to random prompts 
    const prompt = "Would you like to be famous? In what way?";

    // function that submits the user response
    function submitResponse() {
        // code here
    }

    return (
        <div>
            <h1>Today's Prompt</h1>
            <p>{date}</p>
            <div>
                <ul class="list-group container-fluid">
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