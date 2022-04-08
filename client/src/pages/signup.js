import React, { useRef, useState } from 'react';
import { Form, Button, Card, Alert } from 'react-bootstrap';
import "./signup.css";
import { useAuth } from '../context/AuthContext'
import { Link, useNavigate } from 'react-router-dom'


const Signup = () => {
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const { signup } = useAuth();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();

        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError('Passwords do not match')
        }

        // if (passwordRef.current.value || passwordConfirmRef.current.value.length <= 5 ) {
        //     return setError('Your password needs to have more than 6 characters')
        // }

        try {
            setError('')
            setLoading(true)
            await signup(emailRef.current.value, passwordRef.current.value)
            navigate("/home")

        } catch {
            setError('Failed to create an account')
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
                        <h2 className="text-center mb-4">Sign Up</h2>
                        {error && <Alert variant="danger">{error}</Alert>}
                        <Form onSubmit={handleSubmit}>
                            <Form.Group id="email">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" placeholder="email" ref={emailRef} required />
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

