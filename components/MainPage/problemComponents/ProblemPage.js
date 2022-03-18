import React from "react";
import { useState } from "react";
import ProblemTextArea from "./ProblemTextArea";
import {
  FaRegSave,
  FaLongArrowAltRight,
  FaLongArrowAltLeft,
} from "react-icons/fa";

const ProblemPage = () => {
  const [isSaved, setIsSaved] = useState(false);
  const [currentQ, setCurrentQ] = useState(1);

  const [q1, setQ1] = useState("");

  const sendDataToParent = (index) => {
    // the callback. Use a better name

    let questionNum = index[1];
    let content = index[0];

    setQ1(content);

    // console.log(index + "CHILD DATA");
    // console.log(questionNum + "CHILD DATA");

    console.log(q1 + "CHILD Q1");

    if (questionNum === 1) {
      setQ1(content);
      // localStorage.setItem("pq1", content);
    }
  };

  const saveHandler = () => {
    setTimeout(function () {
      console.log(q1 + "q1");
      // localStorage.setItem("pq1", q1);

      setIsSaved(true);
      //   console.log(event.target.value + " LONG");

      setIsSaved(false);
    }, 500);
    // console.log(notesRedux);
  };
  const nextHandler = () => {
    let counter = currentQ + 1;

    setCurrentQ(counter);
  };

  const backHandler = () => {
    let counter = currentQ - 1;

    setCurrentQ(counter);
  };

  let current = new Date();
  let cTime =
    current.getHours() +
    ":" +
    current.getMinutes() +
    ":" +
    current.getSeconds();
  let savedMessage = "Saved at: " + cTime;
  return (
    <div
      className="flex items-center justify-center  px-4 pt-[1rem] sm:px-6 lg:px-8 drop-shadow-xl fade-effect-quick

  "
    >
      <div className="w-full max-w-[42rem] p-10 space-y-8 shadow rounded-xl bg-blues-100 drop-shadow-xl container-style normal-box-soft">
        <div className="flex flex-col items-center justify-center problem-page fade-effect-quick">
          <h1 className="heading-top">Problem Page</h1>
          {currentQ === 1 && (
            <>
              <div className="ai-output-box">
                <h3>Who are the users or customers you want to help?</h3>
              </div>

              <ProblemTextArea
                q="1"
                ph="Who do you really care about?"
                sendDataToParent={sendDataToParent}
              />
            </>
          )}
          {currentQ === 2 && (
            <>
              <div className="ai-output-box">
                <h3>
                  What desired outcome are they trying to accomplish? (could be
                  avoiding an undesireable outcome)
                </h3>
              </div>
              <ProblemTextArea
                q="2"
                ph="PLACEHOLDER"
                sendDataToParent={sendDataToParent}
              />
            </>
          )}
          {currentQ === 3 && (
            <>
              <div className="ai-output-box">
                <h3>
                  When does this problem impact their ability to produce the
                  desired outcome? (when in the sequence of tasks or relative to
                  their lifespan )
                </h3>
              </div>
              <ProblemTextArea
                q="3"
                ph="PLACEHOLDER"
                sendDataToParent={sendDataToParent}
              />
            </>
          )}
          {currentQ === 4 && (
            <>
              <div className="ai-output-box">
                <h3>
                  Where does this problem appear for your user? (Note: this
                  could be a location in time or on the planet earth or any
                  other planet for that matter)
                </h3>
              </div>
              <ProblemTextArea
                q="4"
                ph="PLACEHOLDER"
                sendDataToParent={sendDataToParent}
              />
            </>
          )}
          {currentQ === 5 && (
            <>
              <div className="ai-output-box">
                <h2>5 why's</h2>
                <h3>1. Why does the problem occur?</h3>
              </div>
              <ProblemTextArea
                q="5"
                ph="PLACEHOLDER"
                sendDataToParent={sendDataToParent}
              />
            </>
          )}
          {currentQ === 6 && (
            <>
              <div className="ai-output-box">
                <h2>5 why's</h2>
                <h3>2. Why does the problem occur?</h3>
              </div>
              <ProblemTextArea
                q="6"
                ph="PLACEHOLDER"
                sendDataToParent={sendDataToParent}
              />
            </>
          )}{" "}
          {currentQ === 7 && (
            <>
              <div className="ai-output-box">
                <h2>5 why's</h2>
                <h3>3. Why does the problem occur?</h3>
              </div>
              <ProblemTextArea
                q="7"
                ph="PLACEHOLDER"
                sendDataToParent={sendDataToParent}
              />
            </>
          )}{" "}
          {currentQ === 8 && (
            <>
              <div className="ai-output-box">
                <h2>5 why's</h2>
                <h3>4. Why does the problem occur?</h3>
              </div>
              <ProblemTextArea
                q="8"
                ph="PLACEHOLDER"
                sendDataToParent={sendDataToParent}
              />
            </>
          )}{" "}
          {currentQ === 9 && (
            <>
              <div className="ai-output-box">
                <h2>5 why's</h2>
                <h3>5. Why does the problem occur?</h3>
              </div>
              <ProblemTextArea
                q="9"
                ph="PLACEHOLDER"
                sendDataToParent={sendDataToParent}
              />
            </>
          )}
          {currentQ === 10 && (
            <>
              <div className="ai-output-box">
                <h3>
                  In what way might you guarantee that the desired outcome will
                  happen given when, where, and why the problem occurs?
                </h3>
              </div>
              <ProblemTextArea
                q="10"
                ph="PLACEHOLDER"
                sendDataToParent={sendDataToParent}
              />
            </>
          )}
          <div className="flex items-center save-wrapper">
            <button
              className="flex items-center justify-center card__btn save_button rainbow-effect fade-effect "
              onClick={saveHandler}
            >
              Save
              <FaRegSave className="ml-1" />
            </button>
          </div>
          <div className="flex items-center justify-between w-full">
            {currentQ === 1 && (
              <button
                className=" save_button left-[5%]  flex items-center justify-center !cursor-not-allowed bg-slate-400
 rounded-full drop-shadow-xl fade-effect"
              >
                <FaLongArrowAltLeft className="mr-1 text-[24px]" />
                Back
              </button>
            )}
            {currentQ !== 1 && (
              <button
                className="card__btn save_button left-[5%]  flex items-center justify-center md:hover:scale-105 md:transition-transform md:active:scale-95 fade-effect-quick"
                onClick={backHandler}
              >
                <FaLongArrowAltLeft className="mr-1 text-[24px]" />
                Back
              </button>
            )}
            {currentQ < 11 && (
              <button
                className="card__btn_next save_button right-[50px] flex items-center justify-center md:hover:scale-105 md:transition-transform md:active:scale-95 fade-effect"
                onClick={nextHandler}
              >
                Next
                <FaLongArrowAltRight className="ml-1 text-[24px]" />
              </button>
            )}
            {isSaved && <p className="saved-message-problem">{savedMessage}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProblemPage;
