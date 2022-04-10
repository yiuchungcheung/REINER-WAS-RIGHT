import React, { useState } from 'react'
import firebase from '../firebase';

export default function GroupForm() {
    const [groups, setGroupName] = useState('');

    const handleOnChange = (e) => {
        setGroupName(e.target.value);
    };
    const createGroup = () => {
      const groupRef = firebase.database().ref('groups');
      const group = {
        groups,
      };
      groupRef.push(group)
    }
    
  return (
    <div>
        <input type="text" onChange={handleOnChange}/>
        <button onClick={createGroup}>Create Group</button>
    </div>
  )
}
