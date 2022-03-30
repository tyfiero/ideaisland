// import { useRef, useState, useEffect } from "react";
// import AuthError from "./AuthError";
// import Link from "next/link";
// import { verifyPasswordResetCode, confirmPasswordReset } from "firebase/auth";

// import { auth } from "../../lib/firebase";

// import { useRouter } from "next/router";

// function ResetPage() {
//   const passwordRef = useRef();
//   const [loading, setLoading] = useState(false);
//   const [successMessage, setSuccessMessage] = useState(undefined);
//   const [errorAuth, setErrorAuth] = useState(undefined);
//   const router = useRouter();

//   // Clear Auth Errors on mount
//   useEffect(() => () => setErrorAuth(undefined), []);

//   async function handleSubmit(e) {
//     e.preventDefault();
//     const { oobCode } = router.query;
//     if (!router.query) {
//       setErrorAuth({
//         errorCode: "custom",
//         customMessage: "Missing the password reset code",
//       });
//       return;
//     }
//     try {
//       setLoading(true);
//       await verifyPasswordResetCode(auth, oobCode);
//       await confirmPasswordReset(auth, oobCode, passwordRef.current.value);
//       setSuccessMessage("Password successfully changed.");
//     } catch (error) {
//       console.log(error);
//       setErrorAuth({ errorCode: error?.code });
//       setLoading(false);
//     }

//     setLoading(false);
//   }
//   return (
//     <div className="flex flex-col justify-center min-h-screen py-12 bg-gray-50 sm:px-6 lg:px-8">
      
//       <div className="sm:mx-auto sm:w-full sm:max-w-md">
     
//         <img
//           src="/bulb.svg"
//           alt="logo"
//           className="w-auto h-20 mx-auto sm:h-30"
//         />

//         <h2 className="mt-1 text-3xl font-extrabold text-center text-gray-900">
//           Reset your password
//         </h2>
//       </div>

//       <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
//         <div className="px-4 py-8 bg-white shadow sm:px-10 sm:rounded-lg">
//           {successMessage ? (
//             <>
//               <div className="text-center">
//                 <h3 className="text-sm font-medium text-green-600">
//                   {successMessage}
//                 </h3>
//               </div>
//               <Link href="/login">
//                 <a
//                   disabled={loading}
//                   className="flex justify-center w-full px-4 py-2 mt-6 text-sm font-medium text-white border border-transparent rounded-md shadow-sm bg-blues-500 hover:bg-blues-600 focus:outline-none focus:ring-blues-400 focus:ring-offset-2 focus:ring-2"
//                 >
//                   You can sign in with your new password now.
//                 </a>
//               </Link>
//             </>
//           ) : (
//             <>
//               {errorAuth && (
//                 <AuthError
//                   errorCode={errorAuth.errorCode}
//                   customMessage={errorAuth.customMessage}
//                 />
//               )}
//               <form className="space-y-6" onSubmit={handleSubmit}>
//                 <div>
//                   <label
//                     htmlFor="password"
//                     className="block text-base font-medium text-gray-700"
//                   >
//                     Enter a new password
//                   </label>
//                   <div className="mt-3">
//                     <input
//                       id="password"
//                       name="password"
//                       type="password"
//                       autoComplete="password"
//                       ref={passwordRef}
//                       required
//                       placeholder="Password"
//                       className="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:border-blues-400 focus:outline-none focus:ring-blues-400 sm:text-sm"
//                     />
//                   </div>
//                 </div>

//                 <div>
//                   <button
//                     type="submit"
//                     disabled={loading}
//                     className="flex justify-center w-full px-4 py-2 text-sm font-medium text-white border border-transparent rounded-md shadow-sm bg-blues-500 hover:bg-blues-600 focus:outline-none focus:ring-blues-400 focus:ring-offset-2 focus:ring-2"
//                   >
//                   
//                   </button>
//                 </div>
//               </form>
//             </>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ResetPage;
