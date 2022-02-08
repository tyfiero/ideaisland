// import { useRef, useState } from "react";
// import Spinner from "../Spinner";
// import { CheckCircleIcon } from "@heroicons/react/solid";

// const validateEmail = (email) => {
//   return email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
// };
// function EmailForm({ setStatus }) {
//   const refEmail = useRef();
//   const [formError, setFormError] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       setStatus("loading");
//       const email = refEmail.current.value;
//       if (!email || !validateEmail(email)) {
//         setStatus("waiting");
//         setFormError(true);
//         return;
//       }
//       const { firestore } = await import("../../OLD/oldComponents/firebase-init");
//       const { addDoc, collection, serverTimestamp } = await import(
//         "firebase/firestore"
//       );

//       if (!firestore) return;
//       await addDoc(collection(firestore, "newsletter"), {
//         subscriber: email,
//         createdAt: serverTimestamp(),
//         source: "landing_page",
//       });

//       setStatus("success");
//     } catch (error) {
//       console.log(error);
//       setStatus("waiting");
//       setFormError(false);
//     }
//   };

//   return (
//     <>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="email"
//           onChange={() => {
//             setFormError(false);
//           }}
//           ref={refEmail}
//           name="email"
//           id="email"
//           required
//           className="pl-4 mr-5 border-gray-300 rounded-md focus:ring-blues-500 focus:border-blues-500 focus:outline-none w-80 sm:text-base"
//           placeholder="Your email address"
//         />
//         {formError && (
//           <p className="absolute mt-1 text-sm font-medium text-red-500">
//             Please enter an email address.
//           </p>
//         )}
//         <div className="inline-flex mt-8 rounded-md shadow sm:mt-0">
//           <button
//             type="submit"
//             onClick={handleSubmit}
//             className="inline-flex items-center justify-center px-5 py-2 text-base font-medium text-white border border-transparent rounded-md bg-blues-600 hover:bg-blues-700"
//           >
//             Register
//           </button>
//         </div>
//       </form>
//     </>
//   );
// }
// function Success() {
//   return (
//     <div className="flex flex-row items-center px-4 py-2 rounded-full bg-blues-200">
//       <CheckCircleIcon className="w-8 h-8 mr-3 text-green-500" />
//       <span className="text-gray-900">Successfully signed up. Thank you!</span>
//     </div>
//   );
// }

// function EmailCapture() {
//   const [status, setStatus] = useState("waiting");

//   return (
//     <div className="bg-white">
//       <div className="px-4 py-12 mx-auto max-w-7xl sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
//         <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
//           <span className="block">Like coding at lightning speed?</span>
//           <span className="block text-blues-600">
//             Get the monthly newsletter.
//           </span>
//         </h2>
//         <div className="flex mt-8 lg:mt-0 lg:flex-shrink-0">
//           {
//             {
//               waiting: <EmailForm setStatus={setStatus} />,
//               loading: <Spinner className="w-5 h-5 mx-10 text-blues-500" />,
//               success: <Success />,
//             }[status]
//           }
//         </div>
//       </div>
//     </div>
//   );
// }

// export default EmailCapture;
