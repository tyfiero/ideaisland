import dynamic from "next/dynamic";
import Protected from "../../components/Protected";

import TechStackPage from "../../components/ProtectedArea/TechStack";

function TechStack() {
  return (
    <Protected>
      <TechStackPage />
    </Protected>
  );
}

export default TechStack;
