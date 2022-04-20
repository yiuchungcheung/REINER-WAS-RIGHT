import { getDatabase, ref, onValue, push, set } from 'firebase/database';
import React, { useRef, useState } from 'react';
import { Form, Button, Card, Alert } from 'react-bootstrap';
import { getAuth } from "firebase/auth";
import { Link, useNavigate } from 'react-router-dom';

const Join = () => {
    const navigate = useNavigate();

    // user information
    const auth = getAuth();
    const user = auth.currentUser;
    if (user) {
        console.log('user successfully logged in ' + user.uid);
        // console.log('welcome, user ' + user.uid);
    } else {
        console.log('no user signed in');
    }

    // Get a database reference to our posts
    const db = getDatabase();
    const dbRef = ref(db, 'groups');

    const roomRef = useRef();
    const groupIndex = null;

    async function handleSubmit() {
        if (verifyGroup()) {
            console.log('in if');
            addUserToGroup();
        }
    }

    function verifyGroup() {
        // if not signed in
        if (!user) {
            console.log('sign in first!');
            navigate('/home');
        }

        console.log('room code: ' + roomRef.current.value);
        var data = null;
        onValue(dbRef, (snapshot) => {
            data = snapshot.val();
            console.log('onVal');
        });

        // console.log('groups: ' + data);
        // for (var key in data) {
        //     if (data.hasOwnProperty(key)) {
        //         console.log(key + "--> " + data[key]);
        //         const curGroup = data[key];
        //         for (var groupKey in curGroup) {
        //             if (curGroup.hasOwnProperty(groupKey) && groupKey == 'g_id') {
        //                 console.log(groupKey + ' ' + curGroup[groupKey]);
        //                 const code = curGroup[groupKey];
        //                 if (code == roomRef.current.value) {
        //                     groupIndex = key;
        //                     return true; // found room code specified by user
        //                 }
        //             }
        //         }
        //     }
        // }
        return true; // did not find room code specified by user
    }

    function addUserToGroup() {
        const groupRef = ref(db, 'groups/' + groupIndex + '/members');
        const membersRef = push(groupRef)
            .catch((e) => {
                console.log(e);
                console.log(e.message);
            });
        set(membersRef, {
            member_id: user.uid
        })
    }

    return (
        <div>
            <h3>Join a Group!</h3>
            <Card>
                <Card.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id="groupName">
                            <Form.Label>Group Name</Form.Label>
                            <Form.Control type="text" placeholder="Group Name" ref={roomRef} required />
                        </Form.Group>
                        <Button className="w-100 mt-4 outline" type="submit">Join</Button>
                    </Form>
                </Card.Body>
            </Card>
        </div>
    );
}
export default Join;