import React from "react";
import { useState } from "react";
import ProblemTextArea from "./ProblemTextArea"


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
      localStorage.setItem("pq1", content);
    }
  };

  const saveHandler = () => {
    setTimeout(function () {
      console.log(q1 + "q1");
      localStorage.setItem("pq1", q1);

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
    <div className="problem-page">
      <h1 className="heading-top">Problem Page</h1>
      {currentQ === 1 && (
        <>
          <h3>Who are the users or customers you want to help?</h3>
          <ProblemTextArea
            q="1"
            ph="Who do you really care about?"
            sendDataToParent={sendDataToParent}
          />
        </>
      )}
      {currentQ === 2 && (
        <>
          <h3>
            What desired outcome are they trying to accomplish? (could be
            avoiding an undesireable outcome)
          </h3>
          <ProblemTextArea
            q="2"
            ph="PLACEHOLDER"
            sendDataToParent={sendDataToParent}
          />
        </>
      )}
      {currentQ === 3 && (
        <>
          <h3>
            When does this problem impact their ability to produce the desired
            outcome? (when in the sequence of tasks or relative to their
            lifespan )
          </h3>
          <ProblemTextArea
            q="3"
            ph="PLACEHOLDER"
            sendDataToParent={sendDataToParent}
          />
        </>
      )}
      {currentQ === 4 && (
        <>
          <h3>
            Where does this problem appear for your user? (Note: this could be a
            location in time or on the planet earth or any other planet for that
            matter)
          </h3>
          <ProblemTextArea
            q="4"
            ph="PLACEHOLDER"
            sendDataToParent={sendDataToParent}
          />
        </>
      )}
      {currentQ === 5 && (
        <>
          <h2>5 why's</h2>
          <h3>1. Why does the problem occur?</h3>
          <ProblemTextArea
            q="5"
            ph="PLACEHOLDER"
            sendDataToParent={sendDataToParent}
          />
        </>
      )}
      {currentQ === 6 && (
        <>
          <h2>5 why's</h2>
          <h3>2. Why does the problem occur?</h3>
          <ProblemTextArea
            q="6"
            ph="PLACEHOLDER"
            sendDataToParent={sendDataToParent}
          />
        </>
      )}{" "}
      {currentQ === 7 && (
        <>
          <h2>5 why's</h2>
          <h3>3. Why does the problem occur?</h3>
          <ProblemTextArea
            q="7"
            ph="PLACEHOLDER"
            sendDataToParent={sendDataToParent}
          />
        </>
      )}{" "}
      {currentQ === 8 && (
        <>
          <h2>5 why's</h2>
          <h3>4. Why does the problem occur?</h3>
          <ProblemTextArea
            q="8"
            ph="PLACEHOLDER"
            sendDataToParent={sendDataToParent}
          />
        </>
      )}{" "}
      {currentQ === 9 && (
        <>
          <h2>5 why's</h2>
          <h3>5. Why does the problem occur?</h3>
          <ProblemTextArea
            q="9"
            ph="PLACEHOLDER"
            sendDataToParent={sendDataToParent}
          />
        </>
      )}
      {currentQ === 10 && (
        <>
          <h3>
            In what way might you guarantee that the desired outcome will happen
            given when, where, and why the problem occurs?
          </h3>
          <ProblemTextArea
            q="10"
            ph="PLACEHOLDER"
            sendDataToParent={sendDataToParent}
          />
        </>
      )}
      <div className="save-wrapper">
        <button className="card__btn save_button" onClick={saveHandler}>
          Save
        </button>
        {currentQ !== 1 && (
          <button className="card__btn save_button" onClick={backHandler}>
            Back
          </button>
        )}
        {currentQ < 11 && (
          <button className="card__btn save_button" onClick={nextHandler}>
            Next
          </button>
        )}
        {isSaved && <p className="saved-message-problem">{savedMessage}</p>}
      </div>
    </div>
  );
};

export default ProblemPage;
