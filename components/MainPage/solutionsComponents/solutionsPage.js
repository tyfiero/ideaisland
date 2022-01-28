import Link from "next/link";
import {
  FaPastafarianism,
  FaAlignLeft,
  FaRandom,
} from "react-icons/fa";
function SolutionsPage() {
  return (
    <div className="text-black solution-page">
      <h1 className="heading-top">Solution Page</h1>
      <h4>Tools:</h4>
      <Link href="/Solutions/Combinatorial">
        <a>
          <div className="flex solution-button">
            <FaRandom className="text-2xl" />
            <p>Combinatorial Tool</p>
          </div>
        </a>
      </Link>

      <Link href="/Solutions/Sentence">
        <a>
          <div className="solution-button">
            <FaAlignLeft className="text-2xl" />
            <p>Sentence Tool</p>
          </div>
        </a>
      </Link>

      <Link href="/Solutions/Ai">
        <a>
          <div className="solution-button">
            <FaPastafarianism className="text-3xl" />
            <p>AI Tool</p>
          </div>
        </a>
      </Link>
    </div>
  );
}

export default SolutionsPage;
