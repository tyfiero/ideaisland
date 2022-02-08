import dynamic from "next/dynamic";
import Protected from "../../components/Protected";

import GettingStartedPage from "../../components/ProtectedArea/GettingStarted";

function GettingStarted() {
  return (
    <Protected>
      <GettingStartedPage />
    </Protected>
  );
}

export default GettingStarted;
