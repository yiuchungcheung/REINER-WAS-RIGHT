import { getDatabase,ref, set , push, onValue } from 'firebase/database';
import React, { useRef, useState } from 'react';
import { Form, Button, Card, Alert } from 'react-bootstrap';
import { getAuth } from "firebase/auth";


const Join = () => {
    const [error, setError] = useState("");
    // user information
    const auth = getAuth();
    const user = auth.currentUser;

    // db reference
    const db = getDatabase();
    const dbRef = ref(db, 'groups');

    const roomRef = useRef(); // reference to room code field that user inputs
    const groupMap = {}; // maps (firebase) unique id to the group's room code (key: firebase unique id; value: group room code)

    if (user) {
        console.log('user successfully logged in ' + user.uid);
    } else {
        console.log('no user signed in');
    }

    async function handleSubmit() {
        if (Object.keys(groupMap).includes(roomRef.current.value)) {
            let groupId = groupMap[roomRef.current.value];
            console.log('group id: ' + groupId);
            addUserToGroup(groupId);
        } else {
            setError('Invalid room code');
        }
    }

    function addUserToGroup(groupId) {
        // some bug in here
        console.log('add user to group');
        const memberListRef = ref(db, 'groups/' + groupId + '/members');
        const newMemberRef = push(memberListRef);
        set(newMemberRef, {
            member_id: user.uid
        })
    }

    onValue(dbRef, (snapshot) => {
        const data = snapshot.val();
        console.log(data);

        // populate set of valid, existing room codes
        for (var key in data) {
            if (data.hasOwnProperty(key)) {
                const curGroup = data[key];
                for (var groupKey in curGroup) {
                    if (curGroup.hasOwnProperty(groupKey) && groupKey == 'g_id') {
                        // console.log(groupKey + ' ' + curGroup[groupKey]); // debug
                        groupMap[curGroup[groupKey]] = key; // add g_id to group key list
                    }
                }
            }
        }
    });

    return (
        <div>
            <h3>Join a Group!</h3>
            <Card>
                <Card.Body>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id="groupName">
                            <Form.Label>Group Name</Form.Label>
                            <Form.Control type="text" placeholder="Group Name" ref={roomRef} required />
                        </Form.Group>
                        <Button className="w-100 mt-4 outline" type="submit">Create</Button>
                    </Form>
                </Card.Body>
            </Card>
        </div>
    );
}
export default Join;