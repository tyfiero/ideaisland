// import stringSimilarity from "string-similarity-js";
// import fetch from "node-fetch";
import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { FaPastafarianism, FaSeedling } from "react-icons/fa";
import { useForm } from "react-hook-form";
import Loader from "../../../Loader";
// const stringSimilarity = require("string-similarity");
// const fetch = require("node-fetch");
import { useSelector, useDispatch } from "react-redux";
import {
  gpt3InputAction,
  gpt3OutputAction,
  gptJOutputAction,
} from "../../../../redux/actions";
import GPT3TextArea from "./GPTJTextArea";
import GPTJTextArea from "./GPT3TextArea";
import { gptJInputAction } from "../../../../redux/actions";
import FullLoader from "../../../FullLoader";

const GPTtool = () => {
  const gpt3InputRedux = useSelector((state) => state.gpt3Input);
  const gpt3OutputRedux = useSelector((state) => state.gpt3Output);
  const gptJInputRedux = useSelector((state) => state.gptJInput);
  const gptJOutputRedux = useSelector((state) => state.gptJOutput);

  const dispatch = useDispatch();

  const [aiLoading, setAiLoading] = useState(false);

  const [GPT3Input, setGPT3Input] = useState("");
  const [GPT3Output, setGPT3Output] = useState("");
  const [GPT3Status, setGPT3Status] = useState(false);
  const [GPTJStatus, setGPTJStatus] = useState(false);

  //FALSE = GPT-3 , true is gptj
  const [GPTJorGPT3, setGPTJorGPT3] = useState(true);

  const [responseRecieved, setResponseRecieved] = useState(false);
  const [responseRecievedGPTJ, setResponseRecievedGPTJ] = useState(false);

  const { register, handleSubmit } = useForm({});
  const [aiResponse, setAiResponse] = useState("");
  const [aiResponseGPTJ, setAiResponseGPTJ] = useState("");
  const [charLength, setCharLength] = useState(0);

  // const headers = {
  //   "Content-Type": "application/json",
  // };

  const textStyles = {
    resize: "none",
    fontSize: "1rem",
    lineHeight: "1.5em",
    padding: "10px",
    width: "99%",
    borderRadius: "1rem",
  };
  //gpt3
  const onSubmitForm = async (values) => {
    let formData = values.input;
    setResponseRecieved(false);
    setResponseRecievedGPTJ(false);

    axios({
      method: "POST",
      url: "/api/openAI",
      data: {
        input: formData,
      },
      // headers: headers,
    })
      .then((response) => {
        // console.log("index response");
        // console.log(response.data.results);
        setAiResponse(response.data.results);
        dispatch(gpt3OutputAction(aiResponse));
        setResponseRecieved(true);
        setAiLoading(false);

        return response;
      })
      .catch((error) => {
        console.log(error);
        return "Sorry, an Error occured";
      });
  };

  //gptJ
  const onSubmitFormGptJ = async (values) => {
    let formData = values.input;
    setResponseRecievedGPTJ(false);
    setResponseRecieved(false);

    axios({
      method: "POST",
      url: "/api/gptJ",
      data: {
        input: formData,
      },
      // headers: headers,
    })
      .then((response) => {
        console.log("index response");
        console.log(response.data.results);
        setAiResponseGPTJ(response.data.results);
        setResponseRecievedGPTJ(true);
        setAiLoading(false);
        dispatch(gptJOutputAction(aiResponseGPTJ));
        return response;
      })
      .catch((error) => {
        console.log(error);
        return "Sorry, an Error occured";
      });
  };

  var gptJContent = (
    <form onSubmit={handleSubmit(onSubmitFormGptJ)}>
      <div className="flex flex-col items-center">
        {/* gpt3/j switched component names. Why? Idk */}
        {/* <GPT3TextArea
        q="gptj"
        ph="Prompt for the GPT-J AI to work its magic 👀 "
        // sendDataToParent={sendDataToParent}
      /> */}
        {/* <input
          type="text"
          style={textStyles}
          className="h-[10rem] !w-[25rem] my-5 text-area-note"
          {...register("input", { required: "Required" })}
        /> */}
        <textarea
          name="text"
          rows="14"
          // onChange={(e) => {
          //   console.log("hi");
          //   dispatch(gptJInputAction(e.target.value));

          //   setCharLength(gptJInputRedux.length + 1);
          // }}
          cols="10"
          wrap="soft"
          placeholder="Content to send to AI"
          maxLength="100"
          style={textStyles}
          className="h-[10rem] !w-[25rem] my-5 text-area-note"
          {...register("input", { required: "Required" })}
        ></textarea>
        {/* <GPT3TextArea /> */}
        {/* <p>{charLength + "/100"}</p> */}

        <button
          className="card__btn w-[10rem] items-center flex  rainbow-effect "
          type="submit"
          onClick={() => {
            setGPTJStatus(true);
            setAiLoading(true);
          }}
        >
          <FaSeedling style={{ fontSize: "32px" }} className="pl-2" />
          <p className="pl-2">Send to GPTJ!</p>
        </button>
      </div>
    </form>
  );

  var gpt3Content = (
    <form onSubmit={handleSubmit(onSubmitForm)}>
      <div className="flex flex-col items-center">
        {/* gpt3/j switched component names. Why? Idk */}

        {/* <GPTJTextArea
          q="gpt3"
          ph="Prompt for the GPT-3 AI to work its magic 👀 "
          {...register("input", { required: "Required" })}
          // sendDataToParent={sendDataToParent}
        /> */}

        {/* <input
          type="text"
          className="text-area-note"
          {...register("input", { required: "Required" })}
        /> */}

        <textarea
          name="text"
          rows="14"
          // onChange={(e) => {
          //   console.log("hi");
          //   dispatch(gptJInputAction(e.target.value));

          //   setCharLength(gptJInputRedux.length + 1);
          // }}
          cols="10"
          wrap="soft"
          placeholder="Content to send to AI"
          maxLength="100"
          style={textStyles}
          className="h-[10rem] !w-[25rem] my-5 text-area-note"
          {...register("input", { required: "Required" })}
        ></textarea>
        <button
          className="card__btn w-[10rem] items-center flex  rainbow-effect "
          type="submit"
          onClick={() => {
            //   console.log("button input" + GPT3Input);
            //   console.log("button redux input" + gpt3InputRedux);

            //   sendDataToParent();
            setGPT3Status(true);
            setAiLoading(true);
          }}
        >
          <FaPastafarianism style={{ fontSize: "36px" }} className="pl-2" />
          <p className="pl-2">Send to GPT3!</p>
        </button>
      </div>
    </form>
  );

  var gptjButton = "GPT-J";
  var gpt3Button = "GPT-3";

  return (
    <div className="flex flex-col items-center">
      <button
        className="card__btn w-[8rem]  flex px-3 items-center rainbow-effect "
        onClick={() => {
          setGPTJorGPT3(!GPTJorGPT3);
          setResponseRecieved(false);
          setResponseRecievedGPTJ(false);
          //   console.log(GPTJorGPT3);
        }}
      >
        {GPTJorGPT3 ? (
          <FaSeedling style={{ fontSize: "36px" }} />
        ) : (
          <FaPastafarianism style={{ fontSize: "36px" }} />
        )}

        {GPTJorGPT3 ? gptjButton : gpt3Button}
      </button>
      {GPTJorGPT3 ? gptJContent : gpt3Content}

      <h2 className="pt-4 pb-2 text-xl">Results:</h2>

      <div className="flex items-center ai-output-box">
        {/* {GPTJorGPT3 ? <p>{gptJOutputRedux}</p> : <p>{gpt3OutputRedux}</p>} */}
        {/* <p className="relative">AI:</p> */}
        {/* {responseRecieved && <p>{gpt3OutputRedux}</p>} */}
       
        <Loader show={aiLoading} />
        {/* <Loader show={true} /> */}

        {/* <FullLoader show={true} /> */}

        {responseRecieved && <p>{aiResponse}</p>}
        {!responseRecieved && !responseRecievedGPTJ && !aiLoading && (
          <p className="text-gray-400">{"AI output will display here"}</p>
        )}

        {responseRecievedGPTJ && <p>{"AI:" + aiResponseGPTJ}</p>}
      </div>
    </div>
  );
};

export default GPTtool;

//GPT3 AI call useEffect function from philosopher AI. OLD!!!!!
// useEffect(() => {
//   if (GPT3Status) {
//     const GPT3func = () => {
//       // const openai_token = process.env.NEXT_PUBLIC_OPENAI_API_KEY;

//       const base_prompt = function (topic) {
//         console.log("TOPIC" + topic);

//         //   return `Below is a long paragraph generated by a philosopher AI, which sees the human world from the outside, without the prejudices of human experience. Fully neutral and objective, the AI sees the world as is. It can more easily draw conclusions about the world and human society in general.
//         // The topic provided by the human is '${topic}', to which the AI responds with deep thought.
//         // Philosopher AI: "Hmmm, interesting topic. Here is my rather lengthy response:"`;
//         // };
//         //return `I have an Idea for a product, '${topic}', to which the AI responds with a product concept:`;
//         return "I want to help spa owners. Spa owners have a hard time with customer retention. I have a new idea for a startup. It involves porn, cost reduction, and sportswear. It works by: ";
//       };

//       async function completion_query(prompt, options) {
//         if (!options) options = {};

//         let url = "https://api.openai.com/v1/engines/davinci/completions";
//         let headers = {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${openai_token}`,
//         };
//         let body = {
//           prompt,
//           max_tokens: options.max_tokens || 250,
//           temperature: options.temperature || 0.9,
//           presence_penalty: options.presence_penalty,
//           frequency_penalty: options.frequency_penalty,
//           n: options.n || 1,
//           stream: false,
//           logprobs: null,
//           stop: options.stop,
//         };

//         const responseRaw = await fetch(url, {
//           method: "POST",
//           headers,
//           body: JSON.stringify(body),
//         });
//         const response = await responseRaw.json();

//         return { response, prompt };
//       }

//       async function get_prompt_for_ongoing_query({
//         topic,
//         prev_completions,
//       }) {
//         let prompt = base_prompt(topic);

//         if (prev_completions.length > 0) {
//           // Append "Philosopher AI: " to give it a chat structure
//           prompt += prev_completions

//             .map((s) => `Idea AI: "${s}"`)
//             .join("\n\n");
//         }

//         prompt += `\n\nIdea AI: "`;

//         return prompt;
//       }

//       async function get_gpt3_response({ prompt, opts }) {
//         console.log("PROMPT" + prompt);

//         if (!opts) {
//           opts = {
//             temperature: 0.7,
//             presence_penalty: 1.0,
//             frequency_penalty: 1.0,
//             max_tokens: 500,
//             stop: ["Product Idea AI:", '"\n', "\n\n\n", '\n"'],
//           };
//         }

//         let completion = await completion_query(prompt, opts);

//         if (completion.response.choices) {
//           console.log("choice" + completion.response.choices[0]);

//           let choice = completion.response.choices[0];
//           let response = choice.text;
//           response = response.trim();

//           if (
//             response[response.length - 1] === `"` ||
//             response[response.length - 1] === `〞`
//           ) {
//             response = response.slice(0, -1);
//           }
//           console.log("RESPONSE" + response);
//           dispatch(gpt3OutputAction(response));

//           return response;
//         } else {
//           console.log("completion.response: " + completion.response);
//           return null;
//         }
//       }

//       async function get_philosopher_response({ topic }) {
//         console.log(`Asking Island AI: "${topic}" ...\n\n`);
//         const continuations = 1;

//         let past_responses = [];
//         for (let j = 0; j < continuations; j++) {
//           let prompt = await get_prompt_for_ongoing_query({
//             topic,
//             prev_completions: past_responses,
//           });
//           let response = await get_gpt3_response({ prompt });
//           if (!response) {
//             break;
//           }

//           // for (let prev_response of past_responses) {
//           //   if (
//           //     stringSimilarity.compareTwoStrings(response, prev_response) > 0.95
//           //   ) {
//           //     // stop repeating yourself
//           //     return;
//           //   }
//           // }
//           if (response !== "") {
//             //   console.log(response + "\n");
//             console.log("last response" + response + "\n");
//             //   setGPT3Output(response);
//             //   console.log("output" + GPT3Output);

//             past_responses.push(response);
//           }
//         }
//       }

//       (async function () {
//         await get_philosopher_response({
//           topic: gpt3InputRedux,
//         });
//       })();
//     };
//     GPT3func();
//     setGPT3Status(false);
//   }
// }, [GPT3Status]);
