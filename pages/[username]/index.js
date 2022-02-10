import React from "react";
import ProfilePage from "../../components/ProfilePage";
import IdeaFeed from "../../components/IdeaFeed";
import { getUserWithUsername, postToJSON } from '../../lib/firebase';



export async function getServerSideProps({ query }) {
    const { username } = query;
  
    const userDoc = await getUserWithUsername(username);
  
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
    <div>
      <ProfilePage user={user}/>
      <IdeaFeed ideas={ideas}/>
    </div>
  );
}
