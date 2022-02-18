
// import { useRouter } from "next/router";
import { UserContext } from '../../lib/context';
import { firestore, auth, serverTimestamp } from '../../lib/firebase';

import { useContext, useState } from 'react';
import { useRouter } from 'next/router';

import { useCollection } from 'react-firebase-hooks/firestore';
import toast from 'react-hot-toast';
import IdeaFeed from '../IdeaFeed';

export default function NotePageContent(){
  //THESE are for dynamic routing
  // const router = useRouter();
  // const { id } = router.query;
  return (
    <div className="sentence-container fade-effect-quick">
      <h1 className="heading-top">Ideas</h1>
{/* <IdeasList/> */}
    </div>
    // <h1>Hello {id}</h1>);
  );
}





// function IdeasList() {
//   const ref = firestore.collection('users').doc(auth.currentUser.uid).collection('ideas');
//   const query = ref.orderBy('createdAt');
//   const [querySnapshot] = useCollection(query);

//   const ideas = querySnapshot?.docs.map((doc) => doc.data());

//   return (
//     <>
//       <h1>Manage your Posts</h1>
//       <IdeaFeed ideas={ideas} admin />
//     </>
//   );
// }