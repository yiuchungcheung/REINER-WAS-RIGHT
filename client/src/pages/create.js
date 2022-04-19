import { getDatabase, ref, set, push } from 'firebase/database';
import React, { useRef, useState } from 'react';
import { Form, Button, Card, Alert } from 'react-bootstrap';
import { getAuth, onAuthStateChanged } from 'firebase/auth'; //https://firebase.google.com/docs/auth/web/manage-users
const link = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5);;

const Create = () => {
    const groupRef = useRef();
    const [group, setGroup] = useState("");
    const [linkName, setLinkName] = useState("");
    const [authId, setAuthId] = useState("")
    
    const db = getDatabase();
    const groupsRef = ref(db, 'groups');

    const handleGroupChange = (e) => {
        setGroup(e.target.value)
        setLinkName(link)
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
            if(user) {
                const uid = user.uid
                setAuthId(uid)
                console.log(uid)
            }
        })
    }

    async function writeGroupData() {
        const newGroupRef = push(groupsRef);
        const newGroupKey = newGroupRef.key;
        console.log('group key: ' + newGroupKey);
        set(newGroupRef, {
            g_id: linkName,
            groupname: group
        })
        const newMemberRef = ref(db, 'groups/' + newGroupKey + '/members')
        set(newMemberRef,{
            member_id: authId
        });
    }
    
    return (
        <div>
            <h3>Create page</h3>

            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Room Code: {link}</h2>
                    <Form onSubmit={writeGroupData}>
                        <Form.Group id="groupName">
                            <Form.Label>Group Name</Form.Label>
                            <Form.Control type="text" placeholder="Group Name" ref={groupRef} onChange={handleGroupChange} required />
                        </Form.Group>
                        <Button className="w-100 mt-4 outline" type="submit">Create</Button>
                    </Form>
                </Card.Body>
            </Card>
        </div>
    );
}
export default Create;