import { React, useEffect, useState } from 'react';
import { getDatabase, ref, onValue } from 'firebase/database';
import { getAuth } from "firebase/auth";
import "./home.css";

const Home = () => {

    const [memberInfo, setMemberInfo] = useState([]);
    const auth = getAuth();
    const user = auth.currentUser;
    const memberId = auth.currentUser.uid

    useEffect(() => {
        const db = getDatabase();
        const dbRef = ref(db, 'groups');
        let groupArr = [];


        onValue(dbRef, (snapshot) => {
            const data = snapshot.val();
            let memberArr = [];
            for (var key in data) {
                if (data.hasOwnProperty(key)) {
                    groupArr = data[key]
                }
            }
            snapshot.forEach((groupSnapshot) => {
                var memberValue = (groupSnapshot.child('members').val())
                var uniqueMemberArr = (Object.values(memberValue))
                uniqueMemberArr.forEach((memberObj) => {
                    if (memberObj.member_id == memberId) {
                        memberArr.push((groupSnapshot.child('groupname').val()))
                    }
                })
            })
            setMemberInfo(memberArr)
        })
    },
        []);

    if (user) {
        console.log('user successfully logged in')

    } else {
        console.log('no user signed in');
    }
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
                <li class="list-group-item" onClick={() => { redirectGroup("/create"); }}>+ create a group</li>
                <li class="list-group-item" onClick={() => { redirectGroup("/join"); }}> 🤝 Join a group</li>
                {/* <li class="list-group-item" id="informatics-capstone" onClick={(e) => { redirectGroup("/prompt?" + e.currentTarget.id); }}>Informatics Capstone</li> */}
                {memberInfo.map(function (groupname, index) {
                    return <li class="list-group-item" key={index} onClick={(e) => { redirectGroup("/prompt/" + groupname); }}>{groupname}</li>;
                })}
            </ul>
        </div>
    );
}
export default Home;