import dynamic from "next/dynamic";
import Protected from "../components/Protected";


import FirebaseExplanation from "../components/ProtectedArea/FirebaseExplanation";

function FirebasePage() {
  return (
    <Protected>
      <FirebaseExplanation />
    </Protected>
  );
}

export default FirebasePage;
