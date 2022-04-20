import { getDatabase,ref, set } from 'firebase/database';
import React, { useRef, useState } from 'react';
import { Form, Button, Card, Alert } from 'react-bootstrap';

const Join = () => {

    return (
        <div>
            <h3>Join a Group!</h3>
            <Card>
                <Card.Body>
                    <Form >
                        <Form.Group id="groupName">
                            <Form.Label>Group Name</Form.Label>
                            <Form.Control type="text" placeholder="Group Name" required />
                        </Form.Group>
                        <Button className="w-100 mt-4 outline" type="submit">Create</Button>
                    </Form>
                </Card.Body>
            </Card>
        </div>
    );
}
export default Join;