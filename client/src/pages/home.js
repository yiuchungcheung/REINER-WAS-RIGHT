import { React, useEffect, useState } from 'react';
import { getDatabase, ref, onValue } from 'firebase/database';
import { getAuth } from "firebase/auth";
import "./home.css";

const Home = () => {

    const [memberInfo, setMemberInfo] = useState('');
    const auth = getAuth();
    const user = auth.currentUser;
    const memberId = auth.currentUser.uid

    useEffect(() => {
        const db = getDatabase();
        const dbRef = ref(db, 'groups');
        let groupDataMap = {};
        let groupArr = [];
        let memberArr = [];

        //get group name's if member_id(user) matches member id
        onValue(dbRef, (snapshot) => {
            const data = snapshot.val();

            for (var key in data) {
                if (data.hasOwnProperty(key)) {
                    groupDataMap = data[key]
                    console.log(groupDataMap)
                    
                    // groupDataMap = groupname.groupname
                    //     groupArr.push(groupDataMap)
                    //     console.log(groupArr)
                    //     setMemberInfo(groupArr)
                }
            }
        })
    },
        []);


    if (user) {
        console.log('user successfully logged in')
        //const member_id = auth.currentUser.uid

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

                {/* when groups are created, add ID tag to each created group */}
                {/* adding ? after /prompt to direct to dediated group prompt interface using the group's ID*/}
                <li class="list-group-item" id="informatics-capstone" onClick={(e) => { redirectGroup("/prompt?" + e.currentTarget.id); }}>Informatics Capstone</li>
                <li class="list-group-item">Group 2</li>
                <li class="list-group-item">Group 3</li>
                <li class="list-group-item">{memberInfo}</li>
            </ul>
        </div>
    );
}
export default Home;