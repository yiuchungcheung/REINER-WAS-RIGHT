import { getDatabase, ref, onValue, DataSnapshot, set, push } from 'firebase/database';
import { getAuth } from "firebase/auth";
import { React, useState, useEffect } from 'react';
import "./prompt.css";


const Prompt = () => {
    const db = getDatabase();
    const dbRef = ref(db, 'groups');

    const [responseInfo, setResponseInfo] = useState([]);
    const [groupName, setGroupName] = useState('');
    const [groupId, setGroupId] = useState('');
    const [response, setResponse] = useState();
    const [promptId, setPromptId] = useState();
    const [groupKey, setGroupkey] = useState();
    const auth = getAuth();
    const user = auth.currentUser;
    const uid = user.uid
    const memberId = auth.currentUser.uid

    const current = new Date();
    const date = `${current.getMonth() + 1}/${current.getDate()}/${current.getFullYear()}`;

    //grab group name and groupId and display on the webpage
    useEffect(() => {
        const db = getDatabase();
        const dbRef = ref(db, 'groups');
        const dbRefQuestions = ref(db, 'questions');
        let getGroupName = '';
        let getGroupId = '';
        let getGroupKey;
        let roomCode;
        let tempArrQuestions = [];
        let getPromptId;

        onValue(dbRef, (snapshot) => {
            snapshot.forEach((groupSnapshot) => {

                var memberValue = (groupSnapshot.child('members').val())
                var uniqueMemberArr = (Object.values(memberValue))
                uniqueMemberArr.forEach((memberObj) => {
                    if (memberObj.member_id == memberId) {
                        getGroupName = (groupSnapshot.child('groupname').val())
                        getGroupId = (groupSnapshot.child('g_id').val())
                        roomCode = (groupSnapshot.child('g_id').val())
                        getGroupKey = (groupSnapshot.key)
                    }
                })
            })
            setGroupName(getGroupName)
            setGroupId(getGroupId)
            setGroupkey(getGroupKey)
        });

        //get question id
        onValue(dbRefQuestions, (snapshot) => {
            snapshot.forEach((groupSnapshot) => {
                tempArrQuestions = (groupSnapshot.val())
                if (prompt == tempArrQuestions.question) {
                    getPromptId = (tempArrQuestions.q_id)
                }
            })
            setPromptId(getPromptId)
        })
        //get responses from group into an array
        onValue(dbRef, (snapshot) => {
            let tempPromptArr = [];
            snapshot.forEach((groupsnapshot) => {
                var historyValues = (groupsnapshot.child('history').val())
                var uniqueHistoryArr = (Object.values(historyValues))
                uniqueHistoryArr.forEach((historyObj) => {
                    tempPromptArr.push(historyObj.response)
                });
            });
            setResponseInfo(tempPromptArr)
        })
    },
    []);

        // will need to change this to random prompts 
        const prompt = "Would you like to be famous? In what way?";

        onValue(dbRef, (snapshot) => {
            const data = snapshot.val();
            let thisGroupKey;
            let roomCode;
            // populate set of valid, existing room codes
            for (var key in data) {
                if (data.hasOwnProperty(key)) {
                    const curGroup = data[key];
                    for (var groupKey in curGroup) {
                        if (curGroup.hasOwnProperty(groupKey) && groupKey === 'g_id' && curGroup[groupKey] === roomCode) {
                            // get current room's data
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

            // const history = data[thisGroupKey]["history"];
            // console.log(history);
            // let todaysPrompt = false;
            // for (let key in history) {
            //     if (history.hasOwnProperty(key) && history[key] == 'date') {
            //         if (history) {

            //         }
            //     }
            // }
        });
        // write history data when user submits
        async function writeHistoryData() {
            const db2 = getDatabase();
            const historyListRefId = ref(db2, 'groups/' + groupKey + '/history');
            const newHistoryPostRef = push(historyListRefId);
            set(newHistoryPostRef, {
                response: response,
                member_id: uid,
                question_id: promptId
            })
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
                        <textarea class="form-control list-group-item" id="exampleFormControlTextarea1" rows="3" value={response} onChange={(e) => setResponse(e.target.value)}></textarea>
                        <li class="list-group-item reply" onClick={writeHistoryData}>Submit Response</li>
                    </ul>
                    <div>
                        {responseInfo.map(function(res, index){
                            return <li class="list-group-item" key={ index }>{res}</li>
                        })}
                    </div>
                </div>

            </div>
        );
    }

export default Prompt;