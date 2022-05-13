import React, { useRef, useState } from 'react';
import { Form, Button, Card, Alert } from 'react-bootstrap';
import "./signup.css";
import { useAuth } from '../context/AuthContext'
import { Link, useNavigate } from 'react-router-dom'
import { getDatabase, ref, set } from 'firebase/database';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
export { auth } from '../firebase';

const Signup = () => {
    const emailRef = useRef();
    const nameRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const { signup } = useAuth();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [name, setName] =useState("");

    const handleEmailChange = (event) => {
        setEmail(emailRef.current.value);
    }
    const handleNameChange = (event) => {
        setName(nameRef.current.value);
    }

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            setError('')
            setLoading(true)

            // debug
            // console.log(emailRef.current.value);
            // 

            if (passwordRef.current.value !== passwordConfirmRef.current.value) {
                throw new Error('Passwords do not match')
            }

            const auth = getAuth();
            let response = await createUserWithEmailAndPassword(auth, emailRef.current.value, passwordRef.current.value)
                .then((userCredential) => {
                    const user = userCredential.user;
                    console.log(user.uid);
                    writeUserData(user.uid)
                })

            navigate("/home")
            // add successful account creation popup?
        } catch (error) {
            console.log(error)
            console.log(error.message)
            if (error.message.includes("email-already-in-use")) {
                setError('Email already in use')
            }
            else if (error.message.includes("weak-password")) {
                setError('Password should be at least 6 characters')
            } else if (error.message.includes('Passwords do not match')) {
                setError('Passwords do not match')
            } else {
                setError('Failed to create an account')
            }

        }
        setLoading(false)
    }

    function writeUserData(uid) {
        // writing data: https://firebase.google.com/docs/database/web/read-and-write
        const db = getDatabase();
        set(ref(db, 'users/' + uid), { // get userId from auth = getAuth(); // https://firebase.google.com/docs/auth/web/password-auth#web-version-9_1
            email: email,
            name: name
        });
    }

    return (
        <div>
            <div class="brand">
                <h1>moment</h1>
                <p>prompt with your team!</p>
                <Card>
                    <Card.Body>
                        <h2 className="text-center mb-4">Sign Up</h2>
                        {error && <Alert variant="danger">{error}</Alert>}
                        <Form onSubmit={handleSubmit}>
                            <Form.Group id="name">
                                <Form.Label>Name</Form.Label>
                                <Form.Control type="text" placeholder="name" ref={nameRef} onChange={handleNameChange} required />
                            </Form.Group>
                            <Form.Group id="email">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" placeholder="email" ref={emailRef} onChange={handleEmailChange} required />
                            </Form.Group>
                            <Form.Group id="password">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="must be over 6 characters" ref={passwordRef} required />
                            </Form.Group>
                            <Form.Group id="password-confirm">
                                <Form.Label>Password Confirmation</Form.Label>
                                <Form.Control type="password" placeholder="must match password" ref={passwordConfirmRef} required />
                            </Form.Group>
                            <Button disabled={loading} className="w-100 mt-4 outline" type="submit">Sign Up</Button>
                        </Form>
                    </Card.Body>
                </Card>
                <div className="w-100 text-center mt-2 small"> Already have an account? <Link to="/login">Log In</Link></div>
            </div>
        </div>
    );
}
export default Signup;

