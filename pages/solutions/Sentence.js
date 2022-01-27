import SentenceTool from "../../components/MainPage/solutionsComponents/sentenceTool";
import { useRouter } from "next/router";

const SentencePage = () => {
  //THESE are for dynamic routing
  // const router = useRouter();
  // const { id } = router.query;
  return (
    <SentenceTool />
    // <h1>Hello {id}</h1>);
  );
};

export default SentencePage;
