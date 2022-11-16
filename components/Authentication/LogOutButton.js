import React from "react";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { logIn, logOutAction } from "../../redux/actions";
import { auth } from "../../lib/firebase";
import { MdLogout } from "react-icons/md";






function LogOutButton() {
  const dispatch = useDispatch();

  return (
    <div>
      <Link href="/">
        <a>
          <button
            className="flex items-center gap-3 px-3 py-2 font-medium text-black rounded-full fade-effect hover:text-t-pd bg-t-pl"
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
            <MdLogout className="text-2xl"/>
          </button>
        </a>
      </Link>
    </div>
  );
}

export default LogOutButton;


