import { getDatabase, ref, onValue } from 'firebase/database';
import { getAuth } from "firebase/auth";
import { useState } from 'react';

// const GroupData = () => {
//     const auth = getAuth();
//     const user = auth.currentUser;
//     const memberId = auth.currentUser.uid

//     const db3 = getDatabase();

//     const dataRef3 = ref(db3, '/groups');
//     onValue(dataRef3, (snapshot) => {
//         snapshot.forEach((groupSnapshot) => {
//             const memberGroups = []
//             const valuesOfData = (groupSnapshot.child('groupname').val());
//             memberGroups.push(valuesOfData)
//             console.log(memberGroups)

//                 return (
//                     <li>{memberGroups}</li>

//                 );
//             });
//     });
// }
// export default GroupData

const GroupData = () => {

    const db3 = getDatabase();
    const [memberInfo, setMemberInfo] = useState([]);

    window.addEventListener('load', () => {
        Fetchdata();
    });
    // Fetch the required data using the get() method
    const Fetchdata = () => {
        const dataRef3 = ref(db3, '/groups');
        onValue(dataRef3, (snapshot) => {
            snapshot.forEach((groupSnapshot) => {
                //const memberGroups = []
                const valuesOfData = (groupSnapshot.child('groupname').val());
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