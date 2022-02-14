
// import { useRouter } from "next/router";

import IdeaFeed from "../IdeaFeed";

const NotePageContent = () => {
  //THESE are for dynamic routing
  // const router = useRouter();
  // const { id } = router.query;
  return (
    <div className="sentence-container fade-effect-quick">
      <h1 className="heading-top">Ideas</h1>
      {/* <p>A place for all of your wild ideas and notes.</p> */}
      <div className="feed-holder">
    <IdeaFeed />
    </div>
    </div>
    // <h1>Hello {id}</h1>);
  );
};

export default NotePageContent;
