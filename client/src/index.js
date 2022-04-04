import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import { getAuth, signOut, onAuthStateChanged, EmailAuthProvider, GoogleAuthProvider } from 'firebase/auth'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

const firebaseConfig = {
  apiKey: "AIzaSyAsbSTHXei0rYy_0dDmTqi-lH4SG_vS4SQ",
  authDomain: "moment-252ce.firebaseapp.com",
  databaseURL: "https://moment-252ce-default-rtdb.firebaseio.com",
  projectId: "moment-252ce",
  storageBucket: "moment-252ce.appspot.com",
  messagingSenderId: "706529319872",
  appId: "1:706529319872:web:6276691525fe783b93c625"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase();

//an object of configuration values
const firebaseUIConfig = {
  signInOptions: [ //array of sign in options supported
    //array can include just "Provider IDs", or objects with the IDs and options
    GoogleAuthProvider.PROVIDER_ID,
    { provider: EmailAuthProvider.PROVIDER_ID, requiredDisplayName: true },
  ],
  signInFlow: 'popup', //don't redirect to authenticate
  credentialHelper: 'none', //don't show the email account chooser
  callbacks: { //"lifecycle" callbacks
    signInSuccessWithAuthResult: () => {
      return false; //don't redirect after authentication
    }
  }
}

//the React component to render
function SignIn() {

  const auth = getAuth(); //access the "authenticator"

  return (
    <div>
      <h1>My App</h1>
      <p>Please sign-in:</p>
      <StyledFirebaseAuth uiConfig={firebaseUIConfig} firebaseAuth={auth} />
    </div>
  );
}

const auth = getAuth();

signOut(auth)
    .catch(err => console.log(err)); //log any errors for debugging


onAuthStateChanged(auth, (firebaseUser) => {
  if(firebaseUser){ //firebaseUser defined: is logged in
      console.log('logged in', firebaseUser.displayName);
      //do something with firebaseUser (e.g. assign to a state variable)
  }
  else { //firebaseUser is undefined: is not logged in
      console.log('logged out');
  }
});

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);