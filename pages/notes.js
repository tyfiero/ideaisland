import NotePageContent from "../components/Notes/NotePageContent";
import { useRouter } from "next/router";

const NotePage = () => {
  //THESE are for dynamic routing
  // const router = useRouter();
  // const { id } = router.query;
  return (
    <div className="sentence-container fade-effect-quick">
      <h1 className="heading-top">My Ideas & Notes</h1>
      <p>A place for all of your wild ideas and notes.</p>
    <NotePageContent />

    </div>
    // <h1>Hello {id}</h1>);
  );
};

export default NotePage;
