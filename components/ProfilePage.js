import React from "react";
import { useUserData } from "../lib/hooks";

import { auth } from "../lib/firebase";

import Link from "next/link";
function ProfilePage() {
  const userData = useUserData();

  return (
    <div className="flex flex-col items-center pt-12 fade-effect">
      <h2 className="heading-top">Profile</h2>
      <div className="text-xl">
        {"Hello " + userData.user.displayName + "!"}
      </div>
      <div>{"Email: " + userData.user.email}</div>
      <div> image to go here</div>

      <button
        className="hidden w-[12em] px-3 py-2 font-medium rounded-full md:block md:space-x-6 fade-effect text-white hover:text-t-bd bg-t-bl my-5"
        onClick={() => {
          // auth.signOut();
          console.log("SEND TO UPGRADE PAGE");
        }}
      >
        Upgrade to pro!
      </button>

      <Link href="/">
        <a>
          <button
            className="hidden w-[12em] px-3 py-2 font-medium rounded-full md:block md:space-x-6 fade-effect text-black hover:text-t-pd bg-t-pl"
            onClick={() => {
              auth.signOut();
            }}
          >
            Sign out
          </button>
        </a>
      </Link>
    </div>
  );
}

export default ProfilePage;
