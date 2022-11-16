import React from "react";
import TextareaAutosize from "react-textarea-autosize";
import CanvasSection from "./CanvasSection";

function Overview(props) {
  const [context, setContext] = React.useState(
    "I run a business that helps entrepreneurs come up with new business ideas. It is a web application that uses a set of tools to create innovative new business ideas for people."
  );
  const [editContext, setEditContext] = React.useState(false);

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-2xl text-t-bd dark:text-blues-100">{props.title}</h2>
      <p>***Work in progress!***</p>
      {/* <p>{props.description}</p> */}

      {editContext ? (
        <TextareaAutosize
          className="w-full h-auto my-4 textarea-tw"
          value={context}
          onChange={(e) => setContext(e.target.value)}
          placeholder="..."
        />
      ) : (
        <p className="my-4 ">{context}</p>
      )}

      <button
        className="absolute top-0 right-0 px-2 nun text-base py-1 card__btn_next  flex items-center justify-center md:hover:scale-105 md:transition-transform md:active:scale-95 fade-effect cursor-pointer !shadow-clear-pd3 md:hover:shadow-xl m-1 drop-shadow-xl !bg-gradient-to-br from-white via-t-pl  to-t-pm !shadow-2xl "
        onClick={() => {
          setEditContext(!editContext);
        }}
      >
        {editContext ? "Done" : "Edit Context"}{" "}
      </button>

      <div className="flex flex-wrap items-center justify-center gap-2">
        <CanvasSection
          title="Opportunities"
          kind="Opportunities"
          description={"What are the opportunities for my business?"}
          qContext={context}
        />
        <CanvasSection
          title="Risks"
          kind="Risks"
          description={"What are the macro risks to my business?"}
          qContext={context}
        />
        <CanvasSection
          title="Elevator Pitch"
          kind="Elevator"
          description={"How do I succinctly describe my business to others?"}
          qContext={context}
        />
        <CanvasSection
          title="Slogan"
          kind="Slogan"
          description={"What catchy, memorable slogan will my business have?"}
          qContext={context}
        />
        <CanvasSection
          title="Business/product Name"
          kind="Names"
          description={"What is the name of my business?"}
          qContext={context}
        />
        <CanvasSection
          title="Vision"
          kind="Vision"
          description={"What is your vision for the future of my business?"}
          qContext={context}
        />
      </div>
    </div>
  );
}

export default Overview;
