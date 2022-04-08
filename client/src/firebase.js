import firebase from 'firebase/compat/app';
import 'firebase/compat/auth'

const app = firebase.initializeApp({
  apiKey: "AIzaSyAsbSTHXei0rYy_0dDmTqi-lH4SG_vS4SQ",
  authDomain: "moment-252ce.firebaseapp.com",
  databaseURL: "https://moment-252ce-default-rtdb.firebaseio.com",
  projectId: "moment-252ce",
  storageBucket: "moment-252ce.appspot.com",
  messagingSenderId: "706529319872",
  appId: "1:706529319872:web:6276691525fe783b93c625"
})

export const auth = app.auth()
export default app