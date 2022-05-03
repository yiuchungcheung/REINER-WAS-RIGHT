import { getDatabase, ref, onValue, DataSnapshot } from 'firebase/database';
import { getAuth } from "firebase/auth";
import { React, useState, useEffect } from 'react';
import "./prompt.css";


const Prompt = () => {
    // db reference
    const db = getDatabase();
    const dbRef = ref(db, 'groups');
    const questionRef = ref(db, 'questions');

    const [groupName, setGroupName] = useState('');
    const [groupId, setGroupId] = useState('');
  
    const roomCode = 'pkfkd'; // CHANGE LATER
    const questionList = [];

    // user info
    const auth = getAuth();
    const user = auth.currentUser;
    const memberId = auth.currentUser.uid
    let thisGroupKey;
    let roomData;

    const current = new Date();
    const date = `${current.getMonth() + 1}/${current.getDate()}/${current.getFullYear()}`;
    // console.log("TODAY = " + date);

    //grab group name and groupId and display on the webpage
    useEffect(() => {
        const db = getDatabase();
        const dbRef = ref(db, 'groups');
        let getGroupName = '';
        let getGroupId = '';
        let roomCode;

        onValue(dbRef, (snapshot) => {
            snapshot.forEach((groupSnapshot) => {
                var memberValue = (groupSnapshot.child('members').val())
                var uniqueMemberArr = (Object.values(memberValue))
                uniqueMemberArr.forEach((memberObj) => {
                    if (memberObj.member_id == memberId) {
                        getGroupName = (groupSnapshot.child('groupname').val())
                        getGroupId = (groupSnapshot.child('g_id').val())
                        roomCode =  (groupSnapshot.child('g_id').val())
                    }
                })
            })
            setGroupName(getGroupName)
            setGroupId(getGroupId)
        });
    })


    // will need to change this to random prompts 
    let prompt = "Would you like to be famous? In what way?";

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
<<<<<<< HEAD
            if (history.hasOwnProperty(key) && history[key] == 'date') {
                if (history) {
=======
            if (history.hasOwnProperty(key)) { // each history entry; one day
                const curDay = history[key];
                for (let data in curDay) { // data = date or question
                    if (data == 'date' && curDay[data] == date) {
                        prompt = curDay['question'];
                        console.log(prompt);
                        return true;
                    }
>>>>>>> 4.30prompt

                }
            }
        }
        return false;
    }

    return (
        <div>
            <h1>{groupName}</h1>
            <h2>{groupId}</h2>
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