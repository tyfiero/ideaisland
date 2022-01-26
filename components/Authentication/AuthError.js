import { XCircleIcon } from "@heroicons/react/solid";

function AuthError({ errorCode, customMessage }) {
  // Select the correct message to be displayed based on the error code
  const message =
    {
      "auth/invalid-email": "Invalid email address.",
      "auth/user-disabled": "Your email address has been disabled.",
      "auth/user-not-found": "There is no user with that email address.",
      "auth/wrong-password": "Wrong password.",
      "auth/email-already-in-use":
        "There already exists an account with the given email address.",
      "auth/operation-not-allowed":
        "Email/password accounts are not enabled. Enable email/password accounts in the Firebase Console, under the Auth tab.",
      "auth/weak-password": "Password is not strong enough.",
      "auth/invalid-action-code":
        "Your password reset link either has been used or has expired.",
      custom: customMessage,
    }[errorCode] || "An error occurred. Please try again later.";

  return (
    <div className="mb-4 p-4 bg-red-200 rounded-md">
      <div className="flex">
        <div className="flex-shrink-0">
          <XCircleIcon className="w-5 h-5 text-red-500" />
        </div>
        <div className="ml-3">
          <h3 className="text-gray-800 text-sm font-medium">{message}</h3>
        </div>
      </div>
    </div>
  );
}

export default AuthError;
