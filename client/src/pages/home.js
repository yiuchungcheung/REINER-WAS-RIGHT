import { React, useState } from 'react';
import { getDatabase, ref, onValue } from 'firebase/database';
import { getAuth } from "firebase/auth";
import "./home.css";
import GroupData from '../components/createGroup';



const Home = () => {
    const [memberInfo, setMemberInfo] = useState('');

    const auth = getAuth();
    const user = auth.currentUser;
    if (user) {
        console.log('user successfully logged in')
        //const member_id = auth.currentUser.uid


        // works, recieve users uid
        // console.log('welcome, user ' + user.uid);
    } else {
        console.log('no user signed in');
    }
    function redirectGroup(route) {
        window.location.assign(route);
    }

    const db = getDatabase();
    const dataRef = ref(db, '/groups');
    let studentList = [];
    onValue(dataRef, (snapshot) => {
        snapshot.forEach((groupSnapshot) => {
            //console.log(groupSnapshot.key); //firebase key
            const thisInfo = (groupSnapshot.child("groupname").val()); //g_id
            studentList.push(thisInfo)
            setMemberInfo(studentList)
            console.log(memberInfo)
            //snapshot.child("members").forEach((memberSnapshot) => {
                //console.log(memberSnapshot)
            //});
        })
    })



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
                <li>{memberInfo}</li>
                {/* <GroupData/> */}

            </ul>
        </div>
    );
}
export default Home;