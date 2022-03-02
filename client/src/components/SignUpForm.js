import React from 'react';
import "../pages/home.css"
import TextField from 'react-bootstrap/FormText';
import Button from 'react-bootstrap/Button';

const SignUpForm = () => {

    return (

        <form>
            <div class="form-group">
                <label for="exampleInputEmail1">Email address</label>
                <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"></input>
                <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
            </div>
            <div class="form-group">
                <label for="exampleInputPassword1">Password</label>
                <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password"></input>
            </div>
            <div class="form-check">
                <input type="checkbox" class="form-check-input" id="exampleCheck1"></input>
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
        </form>

    );
}

export default SignUpForm








