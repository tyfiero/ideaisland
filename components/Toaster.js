import { resolveValue, Toaster as ReactHotToaster } from "react-hot-toast";

import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  ExclamationIcon,
} from "@heroicons/react/solid";
import classNames from "./classnames";

function Toaster() {
  return (
    <ReactHotToaster position={"top-right"}>
      {(t) => {
        return (
          <div className={`${t.visible ? "animate-enter" : "animate-leave"}`}>
            {((t.type === "success" ||
              t.type === "error" ||
              t.type === "blank") && (
              <div className="flex max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-md w-80 sm:w-96">
                <div
                  className={classNames(
                    "flex items-center justify-center w-[60px]",
                    t.type === "success" && "bg-green-500",
                    t.type === "blank" && "bg-blue-500",
                    t.type === "error" && "bg-red-500"
                  )}
                >
                  {t.type === "success" && (
                    <CheckCircleIcon className="w-6 h-6 text-white" />
                  )}
                  {t.type === "blank" && (
                    <ExclamationCircleIcon className="w-6 h-6 text-white" />
                  )}
                  {t.type === "error" && (
                    <ExclamationIcon className="w-6 h-6 text-white" />
                  )}
                </div>

                <div className="px-4 py-2 flex-1">
                  <span
                    className={classNames(
                      "font-semibold",
                      t.type === "success" && "text-green-500",
                      t.type === "blank" && "text-blue-500",
                      t.type === "error" && "text-red-500"
                    )}
                  >
                    {t.type === "success" && <span>Success</span>}
                    {t.type === "blank" && <span>Info</span>}
                    {t.type === "error" && <span>Error</span>}
                  </span>
                  <p className="text-sm text-gray-700">
                    {resolveValue(t.message)}
                  </p>
                </div>
              </div>
            )) ||
              resolveValue(t.message)}
          </div>
        );
      }}
    </ReactHotToaster>
  );
}

export default Toaster;
