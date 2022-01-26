import { XIcon } from "@heroicons/react/outline";
import { useEffect, useState } from "react";
import classNames from "../classnames";
import useStore from "../StateManagement";
import CheckboxItem from "./CheckboxItem";
import CookieDetails from "./CookieDetails";
import { useCookies } from "react-cookie";

// Link to the Privacy Policy
function PrivacyPolicy({ privacyPolicyLink }) {
  return (
    <a
      href={privacyPolicyLink}
      target="_blank"
      rel="noreferrer"
      className="underline font-medium text-gray-500"
    >
      Privacy Policy
    </a>
  );
}

// Button to toggle the Cookie Detail view where details
// about the used cookies are presented
function DetailButton() {
  // showDetails controls whether the detail overlay is shown or not
  const [showDetails, setShowDetails] = useState(false);
  return (
    <>
      <button
        className="font-medium text-gray-500 underline"
        onClick={() => {
          setShowDetails(!showDetails);
        }}
      >
        <span className="underline">Details</span>
      </button>
      {showDetails && <CookieDetails setShowDetails={setShowDetails} />}
    </>
  );
}

function CookieBanner({
  privacyPolicyLink,
  showStatistic,
  showMarketing,
  showExternalMedia,
  isEmbedded = false,
  renderXButton = false,
}) {
  // Currently, three checkboxes are shown which control the consent given by the user
  // The Essential cookies are activated by default, the others are included when their
  // respective prop showStatistic, showMarketing or showExternalMedia are set to true
  // the CookieBanner also support and embedded view so that you can embed it in your
  // Privacy page for example. The fixed position is then removed and it can be integrated
  // inline.

  // showCookies controls whether or not the CookieBanner should be shown
  // This state variable will be initialized to false but then in the useEffect hook,
  // we will check the cookie to set it to true if the choice has not been yet done.
  const [showCookies, setShowCookies] = useState(false);

  // These three useState variables control the checked property of the checkboxes
  const [statisticCookies, setStatisticCookies] = useState(false);
  const [marketingCookies, setMarketingCookies] = useState(false);
  const [externalMediaCookies, setExternalMediaCookies] = useState(false);

  const [cookies, setCookie] = useCookies([
    "cookieChoiceDone",
    "acceptStatistic",
    "acceptMarketing",
    "acceptExternalMedia",
  ]);

  // Each time the user selects either one of the consent buttons, we update a global
  // variable "cookieChoiceUpdated". With this, we can inform our Analytic Component
  // that should check if the should change their configuration as consent may have
  // been given or removed
  const set = useStore((state) => state.set);
  const cookieChoiceUpdated = useStore((state) => state.cookieChoiceUpdated);

  // Function to set the cookie that the user has made the choice
  const setCookieChoiceDone = () => {
    setCookie("cookieChoiceDone", "true", { path: "/", maxAge: 31536000 });
    if (isEmbedded === false) {
      setShowCookies(false);
    }
  };

  // Function to handle a click on the accept all button
  const handleAcceptAll = (event) => {
    event.target.blur();
    if (showStatistic)
      setCookie("acceptStatistic", "true", { path: "/", maxAge: 31536000 });
    if (showMarketing)
      setCookie("acceptMarketing", "true", { path: "/", maxAge: 31536000 });
    if (showExternalMedia)
      setCookie("acceptExternalMedia", "true", { path: "/", maxAge: 31536000 });

    setStatisticCookies(true);
    setMarketingCookies(true);
    setExternalMediaCookies(true);
    setCookieChoiceDone();
    set((state) => {
      state.cookieChoiceUpdated = state.cookieChoiceUpdated + 1;
    });
  };

  // Function to handle a click on the accept selection button
  // We conditionally set the cookies
  const handleAcceptSelection = (event) => {
    event.target.blur();
    if (showStatistic) {
      setCookie("acceptStatistic", statisticCookies ? "true" : "false", {
        path: "/",
        maxAge: 31536000,
      });
    }
    if (showMarketing)
      setCookie("acceptMarketing", marketingCookies ? "true" : "false", {
        path: "/",
        maxAge: 31536000,
      });
    if (showExternalMedia)
      setCookie(
        "acceptExternalMedia",
        externalMediaCookies ? "true" : "false",
        {
          path: "/",
          maxAge: 31536000,
        }
      );
    setCookieChoiceDone();
    set((state) => {
      state.cookieChoiceUpdated = state.cookieChoiceUpdated + 1;
    });
  };

  // Function to handle a click on the accept only necessary button
  const handleOnlyNecessary = (event) => {
    event.target.blur();
    if (showStatistic)
      setCookie("acceptStatistic", "false", {
        path: "/",
        maxAge: 31536000,
      });
    if (showMarketing)
      setCookie("acceptMarketing", "false", {
        path: "/",
        maxAge: 31536000,
      });
    if (showExternalMedia)
      setCookie("acceptExternalMedia", "false", {
        path: "/",
        maxAge: 31536000,
      });
    setStatisticCookies(false);
    setMarketingCookies(false);
    setExternalMediaCookies(false);
    setCookieChoiceDone();
    set((state) => {
      state.cookieChoiceUpdated = state.cookieChoiceUpdated + 1;
    });
  };

  // Function to handle a click on the X button for which we don't
  // set or change any consents
  const handleDismiss = (event) => {
    event.target.blur();
    setCookieChoiceDone();
  };

  // Check whether the user was already presented with the cookie Banner and made a choice
  useEffect(() => {
    const choiceCookie = cookies.cookieChoiceDone;
    if (!choiceCookie) {
      setShowCookies(true);
    }
    const statisticCookie = cookies.acceptStatistic;
    if (statisticCookie) {
      setStatisticCookies(statisticCookie === "true" ? true : false);
    } else {
      setStatisticCookies(false);
    }
    const marketingCookie = cookies.acceptMarketing;

    if (marketingCookie) {
      setMarketingCookies(marketingCookie === "true" ? true : false);
    } else {
      setMarketingCookies(false);
    }
    const externalMediaCookie = cookies.acceptExternalMedia;

    if (externalMediaCookie) {
      setExternalMediaCookies(externalMediaCookie === "true" ? true : false);
    } else {
      setExternalMediaCookies(false);
    }
  }, [cookieChoiceUpdated]);
  // We don't return anything when the user has made his choice and the
  // component should not be rendered inline
  if (showCookies === false && isEmbedded === false) return null;
  return (
    <div
      className={classNames(
        isEmbedded ? "" : "fixed bottom-0 inset-x-0 pb-4 sm:pb-5 z-30 max-w-2xl"
      )}
    >
      <div
        className={classNames(isEmbedded ? "" : " px-4 sm:px-6 ", " relative")}
      >
        <div className="p-3 rounded-lg bg-white border shadow sm:p-4">
          <div>
            <p className="font-bold text-lg text-gray-700 truncate flex flex-row">
              <span>Cookie settings</span>
            </p>
            <p className=" text-gray-500 text-sm mb-4">
              <span>
                This website uses cookies to improve your experience on our
                website.
              </span>
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 space-y-3 sm:space-y-0">
            <div className="space-y-2">
              <CheckboxItem category="necessary" value={true} />
              {showStatistic && (
                <CheckboxItem
                  category="statistics"
                  value={statisticCookies}
                  changeHandler={setStatisticCookies}
                />
              )}
              {showMarketing && (
                <CheckboxItem
                  category="marketing"
                  value={marketingCookies}
                  changeHandler={setMarketingCookies}
                />
              )}
              {showExternalMedia && (
                <CheckboxItem
                  category="externalMedia"
                  value={externalMediaCookies}
                  changeHandler={setExternalMediaCookies}
                />
              )}
              {!isEmbedded && (
                <div className="space-x-2">
                  <DetailButton />
                  <span className="text-gray-500">{"|"}</span>
                  <PrivacyPolicy privacyPolicyLink={privacyPolicyLink} />
                </div>
              )}
            </div>
            <div className="flex flex-col space-y-2 justify-center">
              <button
                type="button"
                onClick={handleAcceptAll}
                className="flex items-center w-full justify-center px-2 py-2 border border-transparent rounded-md shadow-sm sm:text-sm font-medium text-white bg-lightning-500 hover:bg-lightning-600"
              >
                Accept all
              </button>
              <button
                type="button"
                onClick={handleAcceptSelection}
                className="flex items-center w-full justify-center px-2 py-2 border border-transparent rounded-md shadow-sm sm:text-sm font-medium text-white bg-lightning-400 hover:bg-lightning-500"
              >
                Accept selection
              </button>
              <button
                type="button"
                onClick={handleOnlyNecessary}
                className="flex items-center w-full justify-center px-2 py-2 border border-transparent rounded-md shadow-sm sm:text-sm font-medium text-white bg-lightning-400 hover:bg-lightning-500"
              >
                Accept only necessary
              </button>
            </div>
          </div>
        </div>
        {!isEmbedded && renderXButton && (
          <div className="hidden sm:block absolute right-0 top-0">
            <button
              type="button"
              onClick={handleDismiss}
              className="mr-4 sm:mr-8 mt-1 flex p-2 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-white"
            >
              <span className="sr-only">Dismiss</span>
              <XIcon className="h-6 w-6 text-gray-700" aria-hidden="true" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default CookieBanner;
