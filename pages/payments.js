import dynamic from "next/dynamic";
import Protected from "../components/Protected";


import PaymentsPage from "../components/ProtectedArea/PaymentsPage";

function Payments() {
  return (
    <Protected>
      <PaymentsPage />
    </Protected>
  );
}

export default Payments;
