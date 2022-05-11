import Link from "next/link";
import { useContext } from "react";
import { UserContext } from "../../lib/context";
import { FaSignInAlt, FaIdCard, FaArrowUp } from "react-icons/fa";
// Component's children only shown to logged-in users
export default function AuthCheck(props) {
  const { username, paidPlan } = useContext(UserContext);

  let planCheckPageContent = (
    <div>
      <div
      className="flex items-center justify-center min-h-screen px-4 pb-[12rem] sm:px-6 lg:px-8 drop-shadow-xl

"
    >
      <div className="w-full max-w-[35em] p-10 space-y-8 shadow rounded-xl bg-blues-100 drop-shadow-xl  fade-effect-quick">
      <img src="/bulb.svg" alt="logo" className="w-auto h-20 mx-auto sm:h-30" />

      <h2 className="mt-1 text-3xl font-extrabold text-center text-gray-900">
      This page requires {props.plan === "Innovator" ? ("an " +props.plan) : ("a " +props.plan)} plan to continue.        

      </h2>
      <p> You need to upgrade your account before accessing this content.</p>
      <div className="flex flex-col items-center gap-2 pt-3">
        <Link href="/pricing" passHref>
          <a>
            <button className="w-[18em] h-12 rounded-3xl bg-t-bl flex items-center justify-center text-white gap-4 drop-shadow-xl md:hover:scale-105 md:transition-transform md:active:scale-95">
              <FaArrowUp style={{ color: "white", fontSize: "29px" }} />
              Upgrade My Account!
            </button>
          </a>
        </Link>
        {/* <Link href="/signup" passHref>
          <a>
            <button className="w-[18em] h-12 rounded-3xl bg-t-pl flex items-center justify-center text-white gap-4 drop-shadow-xl md:hover:scale-105 md:transition-transform md:active:scale-95">
              <FaIdCard style={{ color: "white", fontSize: "29px" }} />
              Sign Up
            </button>
          </a>
        </Link> */}
      </div>
    </div>
    </div>

</div>
  );

  let authCheckPageContent = (
    <div
      className="flex items-center justify-center min-h-screen px-4 pb-[12rem] sm:px-6 lg:px-8 drop-shadow-xl

"
    >
      <div className="w-full max-w-md p-10 space-y-8 shadow rounded-xl bg-blues-100 drop-shadow-xl fade-effect-quick">
        <div>
          <img
            src="/bulb.svg"
            alt="logo"
            className="w-auto h-20 mx-auto sm:h-30"
          />

          <h2 className="mt-1 text-3xl font-extrabold text-center text-gray-900">   You must be signed in to access this content. 
          </h2>
          <p>You&apos;re only a few clicks away from your best idea!</p>
          <div className="flex flex-col items-center gap-2 pt-3">
            <Link href="/login" passHref>
              <a>
                <button className="w-[18em] h-12 rounded-3xl bg-t-bl flex items-center justify-center text-white gap-4 drop-shadow-xl md:hover:scale-105 md:transition-transform md:active:scale-95">
                  <FaSignInAlt style={{ color: "white", fontSize: "29px" }} />
                  Sign in
                </button>
              </a>
            </Link>
            <Link href="/signup" passHref>
              <a>
                <button className="w-[18em] h-12 rounded-3xl bg-t-pl flex items-center justify-center text-white gap-4 drop-shadow-xl md:hover:scale-105 md:transition-transform md:active:scale-95">
                  <FaIdCard style={{ color: "white", fontSize: "29px" }} />
                  Sign Up
                </button>
              </a>
            </Link>
          </div>
        </div>
      </div>

    </div>
  );

  if (props.plan === "Hobbyist") {
    return username && paidPlan === "Hobbyist"
      ? props.children
      : props.fallback ||
          (paidPlan === props.plan
            ? authCheckPageContent
            : planCheckPageContent);
  } else if (props.plan === "Innovator") {
    return username && (paidPlan === "Pro" || paidPlan === "Innovator")
      ? props.children
      : props.fallback ||
          (paidPlan === props.plan
            ? authCheckPageContent
            : planCheckPageContent);
  } else if (props.plan === "Pro") {
    return username && paidPlan === "Pro" 
      ? props.children
      : props.fallback ||
          (paidPlan === props.plan
            ? authCheckPageContent
            : planCheckPageContent);
  }

  return username
    ? props.children
    : props.fallback ||
        (paidPlan === props.plan ? authCheckPageContent : planCheckPageContent);
}
