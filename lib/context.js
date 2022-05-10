import { createContext, useEffect } from 'react';
  

export const UserContext = createContext({ user: null, username: null, plan: null });

//   import { doc, getDoc,  getFirestore,} from "firebase/firestore";

// import React from 'react'

// function Context() {

//     useEffect(() => {
     
//         let planType;
//         let uid;

//         if (user?.uid) {
//           uid = user?.uid;
//         } else if (userUIDRedux) {
//           uid = userUIDRedux;
//         } else if (auth.currentUser?.uid) {
//           uid = auth.currentUser?.uid;
//         } else {
//           uid = "default";
//           console.log("no uid available :(");
//         }
//         const docRef = doc(getFirestore, "users", uid);
//         const docSnap = await getDoc(docRef);
        
//         if (docSnap.exists()) {
//           console.log("Document data:", docSnap.data());
//         } else {
//           // doc.data() will be undefined in this case
//           console.log("No such document!");
//         }
//     }, [])
    
//   return (
//     createContext({ user: null, username: null, plan: null })
//   )
// }

// export default Context



