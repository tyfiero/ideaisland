import NotePageContent from "../../../components/Notes/NotePageContent";
import { useRouter } from "next/router";
import IdeaFeed from "../../../components/IdeaFeed";
import AuthCheck from "../../../components/Authentication/AuthCheck";

const NotePage = () => {
  //THESE are for dynamic routing
  // const router = useRouter();
  // const { id } = router.query;
  return (
    <div className="sentence-container fade-effect-quick">
      <h1 className="heading-top">My Ideas & Notes</h1>
      <p>A place for all of your wild ideas and notes.</p>
      <NotePageContent />
      <div className="feed-holder">
        <IdeaFeed />
      </div>
    </div>
  );
};

export default NotePage;
