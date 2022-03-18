import React from "react";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { logIn, logOutAction } from "../../redux/actions";
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
                  dispatch(logOutAction(true));

                //   localStorage.removeItem("persist:root");
                })
                .catch((error) => {
                  console.log(error);
                });

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
