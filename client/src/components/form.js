import React, { useState } from 'react'
import firebase from '../firebase';

export default function form() {
    const [groupname, setGroupName] = useState('');

    const handleOnChange = (e) => {
        setGroupName(e.target.value);
    };
    const createGroup = () => {
      const groupRef = firebase.database().ref('groups');
      const group = {
        groupname,
        members,
      };
      groupRef.push(group)
    }
    
  return (
    <div>
        <input type="text" onChange={handleOnChange}/>
        <button onClick={createGroup}>Create Group!</button>
    </div>
  )
}
