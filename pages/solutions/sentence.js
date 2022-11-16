import SentenceTool from "../../components/MainPage/solutionsComponents/sentenceTool";

const SentencePage = () => {
  return (
    <div className="sentence-container fade-effect-quick">
      <h1 className="text-3xl  text-t-bd dark:text-blues-100">Sentence Tool</h1>
      <p>A tool for making sentences with random nouns and verbs.</p>
    <SentenceTool />

    </div>
  );
};

export default SentencePage;
