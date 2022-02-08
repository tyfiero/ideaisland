import useStore from "../StateManagement";
import shallow from "zustand/shallow";
import NavigationContainer from "./Navigation/NavigationContainer";
import PageHeader from "./PageHeader";
import MainLayout from "./MainLayout";
import PageDescriptionParagraph from "./PageDescriptionParagraph";

function StateExample() {
  const {
    simpleCounter,
    increaseSimpleCounter,
    clearSimpleCounter,
    nestedState,
    set,
  } = useStore(
    (state) => ({
      simpleCounter: state.simpleCounter,
      increaseSimpleCounter: state.increaseSimpleCounter,
      clearSimpleCounter: state.clearSimpleCounter,
      nestedState: state.nestedState.secondLevel.thirdLevel,
      set: state.set,
    }),
    shallow
  );
  return (
    <div>
      <div>
        <div>
          <span className="font-semibold">Value of the counter:</span>{" "}
          {simpleCounter}
        </div>

        <button
          type="button"
          className="sm:ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blues-500"
          onClick={increaseSimpleCounter}
        >
          increaseSimpleCounter()
        </button>
        <button
          type="button"
          className="mt-3 sm:ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blues-500"
          onClick={clearSimpleCounter}
        >
          clearSimpleCounter()
        </button>
      </div>
      <div className="mt-6">
        <div>
          <span className="font-semibold">Value of the nested state:</span>{" "}
          {nestedState}
        </div>
        <button
          type="button"
          className="mt-3 sm:ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blues-500"
          onClick={() => {
            set((state) => {
              state.nestedState.secondLevel.thirdLevel = "Deep change!";
            });
          }}
        >
          Change nested state with set()
        </button>
      </div>
    </div>
  );
}

function StateExplanation() {
  return (
    <NavigationContainer>
      <MainLayout>
        <PageHeader>State management</PageHeader>
        <PageDescriptionParagraph>
          This starter suggests the use of Zustand.js for state management. It
          is simple to use, super lightweight (1.5 KB), and easy to learn.
        </PageDescriptionParagraph>
        <PageDescriptionParagraph>
          Read through the official documentation{" "}
          <a
            href="https://github.com/pmndrs/zustand"
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            here
          </a>
          .
        </PageDescriptionParagraph>
        <div className="mt-4 space-y-4">
          <p className="text-gray-900 font-bold">How to use it?</p>
          <div className="pl-4 space-y-4">
            <p className="text-gray-700">
              You will find a store (that is where your state lives) in the file
              components/StateManagement.js
            </p>
            <div className="bg-gray-100 px-2 rounded-2xl">
              <pre className="overflow-auto text-sm sm:text-base">
                <code>
                  {`
    const store = create((set) => ({
        set: (fn) => set(produce(fn)),
        simpleCounter: 0,
        increaseSimpleCounter: () =>
            set((state) => ({ simpleCounter: state.simpleCounter + 1 })),
        clearSimpleCounter: () => set({ simpleCounter: 0 }),
        nestedState: { firstLevel: { secondLevel: "Hard to get!" } },
    }));
    `}
                </code>
              </pre>
            </div>
            <p className="text-gray-700">
              Now, inside any component, you can import the state and have
              access to all state variables and functions. No prop drilling
              anymore! The component renders only when one of the picked state
              variables changes!
            </p>
            <div className="bg-gray-100 px-2 rounded-2xl">
              <pre className="overflow-auto text-sm sm:text-base">
                <code>
                  {``}
                  <span className="font-semibold">
                    {`
    import useStore from "../StateManagement";
    import shallow from "zustand/shallow";`}
                  </span>
                  {`
                
    function StateExample() {
        // Pick the state variables from the store
        `}
                  <span className="font-semibold">
                    {`const {
          simpleCounter,
          increaseSimpleCounter,
          clearSimpleCounter,
          nestedState,
          set,
        } = useStore(
          (state) => ({
            simpleCounter: state.simpleCounter,
            increaseSimpleCounter: state.increaseSimpleCounter,
            clearSimpleCounter: state.clearSimpleCounter,
            nestedState: state.nestedState.secondLevel.thirdLevel,
            set: state.set,
          }),
          shallow
        );`}
                  </span>
                  {`

        return (
          <div>
            <div>
              <span>{\`Value of the counter: \${simpleCounter}\`}</span>
              `}
                  <span className="font-semibold">
                    {"<button onClick={increaseSimpleCounter}>"}
                  </span>
                  {`
                increaseSimpleCounter()
              </button>
              `}
                  <span className="font-semibold">
                    {"<button onClick={clearSimpleCounter}>"}
                  </span>
                  {`
                clearSimpleCounter()
              </button>
            </div>
            <div>
              <span>{\`Value of the nested state: \${nestedState}\`}</span>
              <button
                onClick={() => {
                    `}
                  <span className="font-semibold">
                    {`set((state) => {
                        state.nestedState.secondLevel.thirdLevel = "Deep change!";
                    });`}
                  </span>
                  {`
                }}
              >
                Change nested state with set
              </button>
            </div>
          </div>
        );
      }
    `}
                </code>
              </pre>
            </div>
            <p className="text-gray-700">Try this component yourself:</p>
            <div className="text-gray-700 p-5 border border-blues-500 rounded-2xl w-full text-center bg-blues-200">
              <StateExample />
            </div>
          </div>
        </div>

        <div className="mt-4">
          <p className="text-gray-900 font-bold">Why Zustand over Redux?</p>
          <ul role="list" className="mt-4 pl-4 ml-4 list-disc space-y-2">
            {[
              "Simple and un-opinionated",
              "Makes hooks the primary means of consuming state",
              "Doesn't wrap your app in context providers",
              "Can inform components transiently (without causing render)",
            ].map((item, index) => (
              <li key={index} className="text-gray-700">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </MainLayout>
    </NavigationContainer>
  );
}

export default StateExplanation;
