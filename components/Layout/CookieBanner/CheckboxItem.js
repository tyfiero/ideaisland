// import classNames from "../classnames";

function CheckboxItem({ category, changeHandler, value }) {
  // Defines the wording for the checkboxes
  const checkboxItems = {
    necessary: {
      title: "Necessary",
      id: "necessaryCookies",
    },
    statistics: { title: "Statistics", id: "statisticCookies" },
    marketing: { title: "Marketing", id: "marketingCookies" },
    externalMedia: { title: "External media", id: "externalMediaCookies" },
  };
  return (
    <div className="relative flex items-center">
      <div className="flex items-center h-7 sm:h-5">
        <input
          id={checkboxItems[category].id}
          name={checkboxItems[category].id}
          disabled={!changeHandler || false}
          checked={value}
          onChange={() => {
            if (changeHandler) changeHandler(!value);
          }}
          type="checkbox"
          className={classNames(
            "focus:ring-0 focus:outline-none h-6 w-6 sm:h-4 sm:w-4 border-gray-300 rounded",
            !value ? "text-gray-400" : "text-lightning-600"
          )}
        />
      </div>
      <div className="ml-3">
        <label
          htmlFor={checkboxItems[category].id}
          className="font-medium text-gray-700"
        >
          {checkboxItems[category].title}
        </label>
      </div>
    </div>
  );
}

export default CheckboxItem;
