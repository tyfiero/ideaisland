import SentenceTool from "../../components/MainPage/solutionsComponents/sentenceTool";

const SentencePage = () => {
  //THESE are for dynamic routing
  // const router = useRouter();
  // const { id } = router.query;
  return (
    <div className="sentence-container fade-effect-quick">
      <h1 className=" text-3xl text-t-bd dark:text-blues-100 ">Sentence Tool</h1>
      <p>A tool for making sentences with random nouns and verbs.</p>
    <SentenceTool />

    </div>
    // <h1>Hello {id}</h1>);
  );
};

export default SentencePage;
