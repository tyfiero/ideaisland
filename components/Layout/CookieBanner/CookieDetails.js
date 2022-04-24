import { useEffect, useState } from "react";
import { XIcon } from "@heroicons/react/outline";
// import classNames from "../classnames";
// import useStore from "../StateManagement";
import CookieTable from "./CookieTable";

function CookieDetails({ setShowDetails, isEmbedded = false }) {
  const cookieDetails = useStore((state) => state.cookieDetails);
  const [cookieDetail, setCookieDetail] = useState(undefined);
  const [currentCategory, setCurrentCategory] = useState("Necessary");
  useEffect(() => {
    if (!cookieDetails) return;
    const currentCategoryIndex = cookieDetails.findIndex(
      (detail) => detail.category === currentCategory
    );
    if (currentCategoryIndex !== -1)
      setCookieDetail(cookieDetails[currentCategoryIndex]);
  }, [currentCategory, cookieDetails]);
  return (
    <div
      className={classNames(
        isEmbedded
          ? "mt-4"
          : "px-2 sm:px-4 fixed bottom-0 inset-x-0 pb-4 sm:pb-5 z-40"
      )}
    >
      <div className="p-3 bg-white border rounded-lg shadow-lg sm:p-4">
        <div className="grid sm:grid-cols-4">
          {/* Details navigation */}
          <div className="space-y-1 sm:col-span-1 mt-9 sm:mt-0">
            {cookieDetails?.map((cookieDetail) => (
              <button
                key={cookieDetail.category}
                onClick={() => {
                  setCurrentCategory(cookieDetail.category);
                }}
                className={classNames(
                  currentCategory === cookieDetail.category
                    ? "bg-gray-100 text-gray-900"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                  "w-full flex items-center px-3 py-2 text-sm font-medium rounded-md"
                )}
              >
                {cookieDetail.category}
              </button>
            ))}
          </div>
          {/* Details information */}
          {cookieDetail && (
            <div className="w-full px-1 sm:px-3 relative sm:col-span-3 max-h-[500px] overflow-y-auto">
              <div className="mt-2 sm:mt-0">
                <h3 className="text-base font-medium text-gray-900">
                  {cookieDetail.category}
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  {cookieDetail.descriptionText}
                </p>
              </div>
              <CookieTable cookies={cookieDetail.cookies} />
            </div>
          )}
        </div>
      </div>
      {!isEmbedded && (
        <div className="absolute right-5 top-2">
          <button
            type="button"
            onClick={() => {
              setShowDetails(false);
            }}
            className="flex p-2 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-white"
          >
            <span className="sr-only">Dismiss</span>
            <XIcon className="w-6 h-6 text-gray-700" aria-hidden="true" />
          </button>
        </div>
      )}
    </div>
  );
}

export default CookieDetails;
