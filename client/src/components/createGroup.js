import { getDatabase, ref, onValue } from 'firebase/database';
import { getAuth } from "firebase/auth";
import { useState } from 'react';


const GroupData = () => {

    const db3 = getDatabase();
    const [memberInfo, setMemberInfo] = useState([]);

    window.addEventListener('load', () => {
        Fetchdata();
    });
    const Fetchdata = () => {
        const dataRef3 = ref(db3, '/groups');
        onValue(dataRef3, (snapshot) => {
            snapshot.forEach((groupSnapshot) => {
                const valuesOfData = (groupSnapshot.child('groupname').val());
                console.log(valuesOfData)
                setMemberInfo(valuesOfData);
            });
        })
    }
    return (
        <div>
            <center>
                <h2>Student Details</h2>
            </center>
            <li>{memberInfo}</li>
        </div>
    );
}
export default GroupData;