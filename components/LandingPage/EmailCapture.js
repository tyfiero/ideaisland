import { useRef, useState } from "react";
import Spinner from "../Spinner";
import { CheckCircleIcon } from "@heroicons/react/solid";

const validateEmail = (email) => {
  return email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
};
function EmailForm({ setStatus }) {
  const refEmail = useRef();
  const [formError, setFormError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setStatus("loading");
      const email = refEmail.current.value;
      if (!email || !validateEmail(email)) {
        setStatus("waiting");
        setFormError(true);
        return;
      }
      const { firestore } = await import("../../components/firebase-init");
      const { addDoc, collection, serverTimestamp } = await import(
        "firebase/firestore"
      );

      if (!firestore) return;
      await addDoc(collection(firestore, "newsletter"), {
        subscriber: email,
        createdAt: serverTimestamp(),
        source: "landing_page",
      });

      setStatus("success");
    } catch (error) {
      console.log(error);
      setStatus("waiting");
      setFormError(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          onChange={() => {
            setFormError(false);
          }}
          ref={refEmail}
          name="email"
          id="email"
          required
          className="focus:ring-lightning-500 focus:border-lightning-500 focus:outline-none mr-5 w-80 pl-4 sm:text-base border-gray-300 rounded-md"
          placeholder="Your email address"
        />
        {formError && (
          <p className="absolute text-red-500 text-sm font-medium mt-1">
            Please enter an email address.
          </p>
        )}
        <div className="inline-flex rounded-md shadow mt-8 sm:mt-0">
          <button
            type="submit"
            onClick={handleSubmit}
            className="inline-flex items-center justify-center px-5 py-2 border border-transparent text-base font-medium rounded-md text-white bg-lightning-600 hover:bg-lightning-700"
          >
            Register
          </button>
        </div>
      </form>
    </>
  );
}
function Success() {
  return (
    <div className="flex flex-row items-center py-2 px-4 rounded-full bg-lightning-200">
      <CheckCircleIcon className="w-8 h-8 mr-3 text-green-500" />
      <span className="text-gray-900">Successfully signed up. Thank you!</span>
    </div>
  );
}

function EmailCapture() {
  const [status, setStatus] = useState("waiting");

  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
        <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
          <span className="block">Like coding at lightning speed?</span>
          <span className="block text-lightning-600">
            Get the monthly newsletter.
          </span>
        </h2>
        <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
          {
            {
              waiting: <EmailForm setStatus={setStatus} />,
              loading: <Spinner className="w-5 h-5 text-lightning-500 mx-10" />,
              success: <Success />,
            }[status]
          }
        </div>
      </div>
    </div>
  );
}

export default EmailCapture;
