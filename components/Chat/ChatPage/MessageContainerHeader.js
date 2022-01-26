import classNames from "../../classnames";
import NewChatMessageButton from "./NewChatMessageButton";

function MessageContainerHeader({ messageOrder, setMessageOrder }) {
  return (
    <div className="bg-lightning-100 rounded-t-xl shadow mt-5 px-4 py-5 border-b border-gray-200 sm:px-6">
      <div className="-ml-4 -mt-2 sm:flex sm:items-baseline">
        <div className="ml-4 mt-2 flex sm:block justify-between items-center">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Chats</h3>
          <NewChatMessageButton isMobile={true} />
        </div>
        <div className="mt-4 sm:mt-0 ml-4 sm:ml-10">
          <nav className="-mb-px flex space-x-8">
            {["Unprocessed", "Recent"].map((tab) => (
              <button
                key={tab}
                onClick={() => setMessageOrder(tab)}
                className={classNames(
                  tab === messageOrder
                    ? "border-lightning-500 text-lightning-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300",
                  "whitespace-nowrap pb-2 px-1 border-b-2 font-medium text-sm focus:outline-none"
                )}
                aria-current={tab.current ? "order" : undefined}
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>
        <div className="hidden sm:block ml-auto mt-2 flex-shrink-0">
          <NewChatMessageButton isMobile={false} />
        </div>
      </div>
    </div>
  );
}

export default MessageContainerHeader;
