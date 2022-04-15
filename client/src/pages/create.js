import { getDatabase,ref, set } from 'firebase/database';
import React, { useRef, useState } from 'react';
import { Form, Button, Card, Alert } from 'react-bootstrap';
import GroupForm from '../components/groupform'
const link = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5);;

const Create = () => {
    const groupRef = useRef();
    const [group, setGroup] = useState("");

    const handleGroupChange = (e) => {
        setGroup(e.target.value)
    }
    function writeGroupData() {
        const db = getDatabase();
        set(ref(db, 'groups/'+ '3'), {
            group: group
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
                            <Form.Control type="text" placeholder="Group Name" ref = {groupRef} onChange={ handleGroupChange} required />
                        </Form.Group>
                        <Button className="w-100 mt-4 outline" type="submit">Create</Button>
                    </Form>
                </Card.Body>
            </Card>
        </div>
    );
}
export default Create;