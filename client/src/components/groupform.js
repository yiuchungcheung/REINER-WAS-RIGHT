import React, { useState, useRef } from 'react'
import firebase from '../firebase';

export default function GroupForm() {
    const groupRef = useRef();
    const [groups, setGroupName] = useState('');

    const handleOnChange = (e) => {
        setGroupName(e.target.value);
    };
    const createGroup = () => {
      const groupRef = firebase.database().ref('groups/' + groupRef);
      const group = {
        groups: groups
      };
      groupRef.push(group)
    }
    
  return (
    <div>
        <input type="text" onChange= {handleOnChange} ref={groupRef}/>
        <button onClick= {createGroup} >Create Group!</button>
    </div>
  )
}
