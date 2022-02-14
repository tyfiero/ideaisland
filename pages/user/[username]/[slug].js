import IdeaContent from '../../../components/IdeaContent';
import { firestore, getUserWithUsername, postToJSON } from '../../../lib/firebase';
import { useDocumentData } from 'react-firebase-hooks/firestore';


export async function getStaticProps({ params }) {
  const { username, slug } = params;
  const userDoc = await getUserWithUsername(username);

  let idea;
  let path;

  if (userDoc) {
    const postRef = userDoc.ref.collection('ideas').doc(slug);
    idea = postToJSON(await postRef.get());

    path = postRef.path;
  }

  return {
    props: { idea, path },
    revalidate: 50000,
  };
}

export async function getStaticPaths() {
  // Improve my using Admin SDK to select empty docs
  const snapshot = await firestore.collectionGroup('ideas').get();

  const paths = snapshot.docs.map((doc) => {
    const { slug, username } = doc.data();
    return {
      params: { username, slug },
    };
  });

  return {
    // must be in this format:
    // paths: [
    //   { params: { username, slug }}
    // ],
    paths,
    fallback: 'blocking',
  };
}

export default function Idea(props) {

  return (
    <main>

    </main>
  );
}