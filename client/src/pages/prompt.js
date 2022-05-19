import { getDatabase, ref, onValue, DataSnapshot, set, push } from 'firebase/database';
import { getAuth } from "firebase/auth";
import { React, useState, useEffect } from 'react';
import "./prompt.css";
import { useNavigate, useLocation, useParams } from 'react-router-dom';


const Prompt = () => {

    const db = getDatabase();
    const realGroupName = useParams();
    const dbRef = ref(db, 'groups');
    const questionRef = ref(db, 'questions');
    const questionList = [];
    const questionMap = {};

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

    const usersRef = ref(db, 'users');
    const userDict = {};

    onValue(usersRef, (snapshot) => {
        const data = snapshot.val();
        for (let id in data) {
            userDict[id] = data[id].name;
        }
    });

    var responseMap = {};
    var responseMapArry=[];

    useEffect(() => {
        const db = getDatabase();
        const dbRef = ref(db, 'groups');
        // const nameRef = ref(db, 'users');
        const dbRefQuestions = ref(db, 'questions');
        let getGroupId = '';
        let getGroupKey;
        let roomCode;
        let tempArrQuestions = [];
        let getPromptId;
        let histValues;
        let nameVal;
        let returnNameVal;
        let tempMemId;

        //gets groupname and groupid
        onValue(dbRef, (snapshot) => {
            snapshot.forEach((groupSnapshot) => {
                var memberValue = (groupSnapshot.child('members').val())
                var uniqueMemberArr = (Object.values(memberValue))
                uniqueMemberArr.forEach((memberObj) => {
                    if (memberObj.member_id === memberId && realGroupName.id === (groupSnapshot.child('groupname').val())) {
                        getGroupId = (groupSnapshot.child('g_id').val())
                        roomCode = (groupSnapshot.child('g_id').val())
                        getGroupKey = (groupSnapshot.key)
                    }
                })
            })
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

        //get responses from group into an array(CURRENTLY WORKING ON)
        onValue(dbRef, (snapshot) => {
            let tempPromptArr = [];
            snapshot.forEach((groupsnapshot) => {
                var historyValues = (groupsnapshot.child('history').val())
                var uniqueHistoryArr = (Object.values(historyValues))
                uniqueHistoryArr.forEach((historyObj) => {
                    if (realGroupName.id === (groupsnapshot.child('groupname').val())) {
                        histValues = (historyObj.response);
                        var realNames = (userDict[historyObj.member_id])
                        var together = realNames + ' : '+ histValues
                        tempPromptArr.push(together)
                        console.groupEnd();
                    }
                });
            });
            setResponseInfo(tempPromptArr)
            responseMap[tempMemId] = histValues;
            console.log(responseMap)
            responseMapArry = Object.entries(responseMap)

        })
    },
        []);

    const digits = [];
    for (let n = 0; n < 10000; n++) {
        digits.push()
    }
    // Who is Eren anyway
    let prompt;
    let questionId;
    // get questions
    onValue(questionRef, (snapshot) => {
        const data = snapshot.val();
        for (let key in data) {
            if (data.hasOwnProperty(key)) { // each question object
                const questionObj = data[key];
                let qid = undefined;
                for (let field in questionObj) {
                    if (field == 'q_id') qid = questionObj[field];

                    if (field == 'question') {
                        questionList.push(questionObj[field]);
                        questionMap[questionObj[field]] = qid;
                    }
                }
            }
        }
    }, {
        onlyOnce: true
    });
    // write history data when user submits(WORKS)
    async function writeHistoryData() {
        const db2 = getDatabase();
        const historyListRefId = ref(db2, 'groups/' + groupKey + '/history');
        const newHistoryPostRef = push(historyListRefId);
        //console.log('Q ID ' + promptId + ' ' + questionId)
        questionId = questionMap[prompt];
        if (questionId == undefined) questionId = promptId;
        set(newHistoryPostRef, {
            response: response,
            member_id: uid,
            question_id: questionId,
            question: prompt,
            date: date
        })        
    }

    function todaysQuestionExists(data, groupKey) {
        //console.log(groupKey)
        const history = data[groupKey]["history"];
        for (let key in history) {
            if (history.hasOwnProperty(key)) { // each history entry; one day
                const curDay = history[key];
                for (let data in curDay) { // data = date or question
                    if (data == 'date' && curDay[data] == date) {
                        prompt = curDay['question'];
                        questionId = questionMap[prompt];
                        return true;
                    }

                }
            }
        }
        return false;
    }

    onValue(dbRef, (snapshot) => {
        const data = snapshot.val();
        if (!todaysQuestionExists(data, groupKey)) {
            const rand = Math.floor(Math.random() * questionList.length);
            //console.log(rand);
            prompt = questionList[rand];
            questionId = questionMap[prompt];

            const db2 = getDatabase();
            const historyListRefId = ref(db2, 'groups/' + groupKey + '/history');
            const newHistoryPostRef = push(historyListRefId);
            set(newHistoryPostRef, {
                response: '',
                member_id: uid,
                question_id: questionId,
                question: prompt,
                date: date
            })
        }
    }, {
        onlyOnce: true
    });

    return (
        <div>
            <h2>Group: {realGroupName.id}</h2>
            <h2>Room Code: {groupId}</h2>
            <div>
                <ul class="list-group container-fluid">
                    <h2>Today's Prompt</h2>
                    <p>{date}</p>
                    <li class="list-group-item">{prompt}</li>
                    <textarea class="form-control list-group-item" id="textArea" rows="3" value={response} onChange={(e) => setResponse(e.target.value)}></textarea>
                    <li class="list-group-item reply" onClick={writeHistoryData}>Submit Response</li>
                </ul>
                <div>
                    {responseInfo.map(function (res, index) {
                         return <li className="list-group-item" id='responses' key={index}>{res}</li>
                    })}
                </div>
            </div>
        </div>
    );
}

export default Prompt;