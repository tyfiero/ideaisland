import { useState } from 'react';
import { firestore, fromMillis, postToJSON } from '../lib/firebase';
import Loader from './Layout/Loader';
import IdeaFeed from './IdeaFeed';

const LIMIT = 1;

export async function getServerSideProps(context) {
    const postsQuery = firestore
      .collectionGroup('ideas')
      .where('published', '==', true)
      .orderBy('createdAt', 'desc')
      .limit(LIMIT);
  
    const ideas = (await postsQuery.get()).docs.map(postToJSON);
  
    return {
      props: { ideas }, // will be passed to the page component as props
    };
  }



export default function PublicIdeaFeed(props) {
    const [ideas, setIdeas] = useState(props.ideas);
    const [loading, setLoading] = useState(false);
  
    const [ideasEnd, setIdeasEnd] = useState(false);
  
    const getMoreIdeas = async () => {
      setLoading(true);
      const last = ideas[ideas.length - 1];
  
      const cursor = typeof last.createdAt === 'number' ? fromMillis(last.createdAt) : last.createdAt;
  
      const query = firestore
        .collectionGroup('posts')
        .where('published', '==', true)
        .orderBy('createdAt', 'desc')
        .startAfter(cursor)
        .limit(LIMIT);
  
      const newPosts = (await query.get()).docs.map((doc) => doc.data());
  
      setIdeas(ideas.concat(newPosts));
      setLoading(false);
  
      if (newPosts.length < LIMIT) {
        setIdeasEnd(true);
      }
    };
  
    return (
        <main>
          <IdeaFeed ideas={ideas} />
  
          {!loading && !ideasEnd && <button onClick={getMoreIdeas}>Load more</button>}
  
          <Loader show={loading} />
  
          {ideasEnd && 'You have reached the end of the public ideas!'}
        </main>
    );
  }
  