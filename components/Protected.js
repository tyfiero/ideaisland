import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Spinner from "./Spinner";

function FullPageLoader() {
  // This component displays a full page loading overview
  // in order to prevent the "flash" of protected pages.
  // The loader is only shown after a short delay

  const [showLoader, setShowLoader] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setShowLoader(true), 500);

    return () => clearTimeout(timer);
  }, []);
  return (
    showLoader && (
      <div className="flex flex-col items-center justify-center min-h-screen text-blues-500">
        <Spinner className="w-10 h-10 mb-4 text-6xl" />
        <p className="text-gray-700">Loading...</p>
      </div>
    )
  );
}
