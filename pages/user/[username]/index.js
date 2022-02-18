import React from "react";
import ProfilePage from "../../../components/ProfilePage";
import IdeaFeed from "../../../components/IdeaFeed";
import { getUserWithUsername, postToJSON } from '../../../lib/firebase';
import AuthCheck from "../../../components/Authentication/AuthCheck";



export async function getServerSideProps({ query }) {
    const { username } = query;
  
    const userDoc = await getUserWithUsername(username);
  

 // If no user, short circuit to 404 page
 if (!userDoc) {
    return {
      notFound: true,
    };
  } 


    // JSON serializable data
    let user = null;
    let ideas = null;
  
    if (userDoc) {
      user = userDoc.data();
      const ideasQuery = userDoc.ref
        .collection('ideas')
        .where('published', '==', true)
        .orderBy('createdAt', 'desc')
        .limit(5);
        ideas = (await ideasQuery.get()).docs.map(postToJSON);
    }
  
    return {
      props: { user, ideas }, // will be passed to the page component as props
    };
  }

export default function UserProfilePage({ user, ideas }) {
  return (
    // <AuthCheck>
    <div>
      <ProfilePage user={user}/>
      <IdeaFeed ideas={ideas}/>
    </div>
    // </AuthCheck>
  );
}
