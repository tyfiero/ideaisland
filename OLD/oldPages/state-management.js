import dynamic from "next/dynamic";
import Protected from "../../components/Protected";


import StateExplanation from "../../components/ProtectedArea/StateExplanation";

function StateManagement() {
  return (
    <Protected>
      <StateExplanation />
    </Protected>
  );
}

export default StateManagement;
