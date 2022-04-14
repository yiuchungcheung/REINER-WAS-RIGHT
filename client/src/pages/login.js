import React, { useRef, useState } from 'react';
import { Form, Button, Card, Alert } from 'react-bootstrap';
import "./login.css";
import { useAuth } from '../context/AuthContext'
import { Link, useNavigate } from 'react-router-dom'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

// global uid variable (?)
// const uid = {};

const Login = () => {
    const emailRef = useRef();
    const passwordRef = useRef();
    const { login } = useAuth();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            setError('')
            setLoading(true)
            // await login(emailRef.current.value, passwordRef.current.value)
            const auth = getAuth();
            let response = await signInWithEmailAndPassword(auth, emailRef.current.value, passwordRef.current.value)
            .then((userCredential) => {
                const user = userCredential.user;
                
                // global uid variable
                // uid = user.uid;
                
                // debug
                // console.log('successfully signed in ' + emailRef.current.value + ' (' + user.uid + ')');
                //
            })

            // add successful login popup?
            navigate("/home")

        } catch (error) {
            console.log(error)
            console.log(error.message)
            if (error.message.includes('user-not-found')) {
                setError('User not found')
            } else if (error.message.includes('wrong-password')) {
                setError('Incorrect password')
            } else {
                setError('Failed to log in')
            }
        }
        setLoading(false)
    }

    return (
        <div>
            <div class="brand">
                <h1>moment</h1>
                <p>prompt with your team!</p>
                <Card>
                    <Card.Body>
                        <h2 className="text-center mb-4">Log In</h2>
                        {error && <Alert variant="danger">{error}</Alert>}
                        <Form onSubmit={handleSubmit}>
                            <Form.Group id="email">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" placeholder="email" ref={emailRef} required />
                            </Form.Group>
                            <Form.Group id="password">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="password" ref={passwordRef} required />
                            </Form.Group>
                            <Button disabled={loading} className="w-100 mt-4 outline" type="submit">Log In</Button>
                        </Form>
                    </Card.Body>
                </Card>
                <div className="w-100 text-center mt-2 small"> Need an account? <Link to="/signup">Sign Up</Link></div>
            </div>
        </div>
    );
}
export default Login;