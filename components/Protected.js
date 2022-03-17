import { useEffect, useState } from "react";
import { useRouter } from "next/router";

// import useStore from "./StateManagement";
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

// function Protected({ children, adminOnly = false }) {
//   // const user = useStore((state) => state.user);
//   const router = useRouter();
//   useEffect(() => {
//     // If the user is not logged in, then we redirect the user to the login page.
//     // We use a short delay to avoid flashing the login page on a hard reload
//     // or a first navigation to a protected route when the user has a Firebase
//     // Auth cookie but the user in the store is not yet set
//     const timer = setTimeout(() => {
//       if (!user) {
//         console.log("user undefined, push to login");
//         router.push({
//           pathname: "/login",
//           query: { returnUrl: router.asPath },
//         });
//       }
//     }, 500);

//     // If the page is only for admins only, we redirect the user
//     if (user && adminOnly && !user.claims?.admin) {
//       console.log("user defined, admin false, push to login");

//       router.push({
//         pathname: "/login",
//         query: { returnUrl: router.asPath },
//       });
//     }
//     return () => clearTimeout(timer);
//   }, [user, router, adminOnly]);

//   // If there is no user, we will show the Full Page loader
//   if (!user) {
//     return <FullPageLoader />;
//   }
//   // Else we will return all children of the component
//   return children;
// }

// export default Protected;
