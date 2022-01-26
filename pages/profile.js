import dynamic from "next/dynamic";
import Protected from "../components/Protected";

import ProfilePage from "../components/ProtectedArea/Profile/ProfilePage";

function Profile() {
  return (
    <Protected>
      <ProfilePage />
    </Protected>
  );
}

export default Profile;
