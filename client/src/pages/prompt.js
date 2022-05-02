import { getDatabase, ref, onValue, DataSnapshot } from 'firebase/database';
import { getAuth } from "firebase/auth";
import { React, useState, useEffect } from 'react';
import "./prompt.css";


const Prompt = () => {
    // db reference
    const db = getDatabase();
    const dbRef = ref(db, 'groups');

    const [groupName, setGroupName] = useState('');
    const [groupId, setGroupId] = useState('');
    const auth = getAuth();
    const user = auth.currentUser;
    const memberId = auth.currentUser.uid

    const current = new Date();
    const date = `${current.getMonth() + 1}/${current.getDate()}/${current.getFullYear()}`;

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
    const prompt = "Would you like to be famous? In what way?";

    // function that submits the user response
    function submitResponse() {
    }

    onValue(dbRef, (snapshot) => {
        const data = snapshot.val();
        let thisGroupKey;
        let roomCode;
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