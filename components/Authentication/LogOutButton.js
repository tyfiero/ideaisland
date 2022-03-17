import React from "react";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { logIn } from "../../redux/actions";
import { auth } from "../../lib/firebase";

function LogOutButton() {
  const dispatch = useDispatch();

  return (
    <div>
      <Link href="/">
        <a>
          <button
            className="hidden w-[12em] px-3 py-2 font-medium rounded-full md:block md:space-x-6 fade-effect text-black hover:text-t-pd bg-t-pl"
            onClick={() => {
              auth
                .signOut()
                .then(() => {
                  console.log("Sign out successful");
                  dispatch(logIn(false));
                  localStorage.removeItem("userLocal");
                })
                .catch((error) => {
                  console.log(error);
                });

              //REMOVE redux persist local storage on signout! @auth
              //   localStorage.clear();
            }}
          >
            Sign out
          </button>
        </a>
      </Link>
    </div>
  );
}

export default LogOutButton;
