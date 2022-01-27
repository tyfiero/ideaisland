import SentenceTool from "../../components/MainPage/solutionsComponents/SentenceTool";
import { useRouter } from "next/router";
import GPTtool from "../../components/MainPage/solutionsComponents/AI/GPT3";
const AIPage = () => {
  //THESE are for dynamic routing
  // const router = useRouter();
  // const { id } = router.query;
  return (
    <div className="TBD-container">
    <h1 className="heading-top">AI Ideation TOOL</h1>
    <h4>
      Harness the power of advanced AI with this GPT3 product idea tool!{" "}
    </h4>

    <p>
      *Note: Results from the GPT3 AI can be wild, the responses do not
      reflect the beliefs or ideals of IdeaIsland*
    </p>
    <GPTtool />
    </div>
  )
};

export default AIPage;
