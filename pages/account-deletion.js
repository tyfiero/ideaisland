import { CheckCircleIcon } from "@heroicons/react/outline";

function accountDeletion() {
  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen">
      <div className="inline-flex items-center justify-center h-8 px-4 py-2 text-sm font-medium text-gray-700 border rounded-md shadow-sm border-blues-400 bg-blues-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blues-500">
        <CheckCircleIcon className="w-5 h-5 mr-2 text-green-500" />
        Account deletion successful
      </div>
      <p className="mt-4 text-gray-700">We are sorry to see you go!</p>
    </div>
  );
}

export default accountDeletion;
