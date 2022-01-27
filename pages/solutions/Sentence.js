import SentenceTool from "../../components/MainPage/solutionsComponents/SentenceTool";
import { useRouter } from "next/router";

const SentencePage = () => {
  //THESE are for dynamic routing
  // const router = useRouter();
  // const { id } = router.query;
  return (
    <div className="sentence-container">
      <h1 className="heading-top">Sentence Tool</h1>
      <p>A tool for making sentences with random nouns and verbs.</p>
    <SentenceTool />

    </div>
    // <h1>Hello {id}</h1>);
  );
};

export default SentencePage;
