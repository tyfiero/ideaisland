import React from "react";
import ProfilePage from "../../../components/ProfilePage";
import IdeaFeed from "../../../components/Notes/IdeaFeed";
import {
  getUserWithUsername,
  postToJSON,
  firestore,
} from "../../../lib/firebase";
import {
  query,
  collection,
  where,
  getDocs,
  limit,
  orderBy,
  getFirestore,
} from "firebase/firestore";

import AuthCheck from "../../../components/Authentication/AuthCheck";

export async function getServerSideProps({ query: urlQuery }) {
  const { username } = urlQuery;

  console.log(username);
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
    // const ideasQuery = userDoc.ref
    //   .collection('ideas')
    //   .where('published', '==', true)
    //   .orderBy('createdAt', 'desc')
    //   .limit(5);

    const ideasQuery = query(
      collection(getFirestore(), userDoc.ref.path, "ideas"),
      where("published", "==", true),
      orderBy("createdAt", "desc"),
      limit(5)
    );
    ideas = (await getDocs(ideasQuery)).docs.map(postToJSON);
  }

  return {
    props: { user, ideas }, // will be passed to the page component as props
  };
}

function UserProfilePage({ user, ideas }) {
  return (
    // <AuthCheck>
    <div>
      <ProfilePage user={user} />
      <IdeaFeed ideas={ideas} />
    </div>
    // </AuthCheck>
  );
}

export default UserProfilePage;
