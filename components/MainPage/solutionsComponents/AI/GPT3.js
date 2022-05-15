// import stringSimilarity from "string-similarity-js";
// import fetch from "node-fetch";
import React from "react";
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "../../../../lib/context";
import { FaPastafarianism, FaPlus, FaRobot, FaSeedling } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { auth } from "../../../../lib/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import Loader from "../../../Layout/Loader";
// const stringSimilarity = require("string-similarity");
// const fetch = require("node-fetch");
import { useSelector, useDispatch } from "react-redux";
import {
  gpt3InputAction,
  gpt3OutputAction,
  gptJOutputAction,
} from "../../../../redux/actions";
// import GPT3TextArea from "./GPTJTextArea";
// import GPTJTextArea from "./GPT3TextArea";
import { gptJInputAction } from "../../../../redux/actions";
// import FullLoader from "../../../FullLoader";
import TextareaAutosize from "react-textarea-autosize";
import { BiSend } from "react-icons/bi";
import Toggle from "react-toggle";
import {
  BsArrow90DegRight,
  BsArrowRight,
  BsHourglassSplit,
} from "react-icons/bs";

const GPTtool = ({ showButton }) => {
  const { user, username } = useContext(UserContext);
  const gpt3InputRedux = useSelector((state) => state.gpt3Input);
  const gpt3OutputRedux = useSelector((state) => state.gpt3Output);
  const gptJInputRedux = useSelector((state) => state.gptJInput);
  const gptJOutputRedux = useSelector((state) => state.gptJOutput);
  const sArray = useSelector((state) => state.sArray);
  const userUIDRedux = useSelector((state) => state.userUID);

  const dispatch = useDispatch();

  const [aiLoading, setAiLoading] = useState(false);
  const [warning, setWarning] = useState(true);

  const [GPT3Input, setGPT3Input] = useState("");
  const [GPTJInput, setGPTJInput] = useState("");
  const [oldInput, setoldInput] = useState("");

  const [GPT3Output, setGPT3Output] = useState("");
  // const [GPT3Status, setGPT3Status] = useState(false);
  // const [GPTJStatus, setGPTJStatus] = useState(false);

  //FALSE = GPT-3 , true is gptj
  const [GPTJorGPT3, setGPTJorGPT3] = useState(true);

  const [responseRecieved, setResponseRecieved] = useState(false);
  const [responseRecievedGPTJ, setResponseRecievedGPTJ] = useState(false);
  const [credits, setCredits] = useState(0);

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

  useEffect(() => {
    getTokenAmount();
  }, []);

  const deduct = async (values) => {
    let uid;
    if (user?.uid) {
      uid = user?.uid;
    } else if (userUIDRedux) {
      uid = userUIDRedux;
    } else if (auth.currentUser?.uid) {
      uid = auth.currentUser?.uid;
    } else {
      uid = "1";
      console.log("no uid available :(");
    }
    let newBalance = (credits - values).toFixed(1);
    const ref = doc(getFirestore(), "users", uid);
    const docSnap = await updateDoc(ref, { credits: newBalance });
    setCredits(newBalance);
  };

  const getTokenAmount = async (values) => {
    let uid;
    if (user?.uid) {
      uid = user?.uid;
    } else if (userUIDRedux) {
      uid = userUIDRedux;
    } else if (auth.currentUser?.uid) {
      uid = auth.currentUser?.uid;
    } else {
      uid = "1";
      console.log("no uid available :(");
    }
    const ref = doc(getFirestore(), "users", uid);
    const docSnap = await getDoc(ref);
    // console.log(docSnap)
    if (docSnap.exists()) {
      // console.log("Document data:", docSnap.data());
      setCredits(docSnap.data().credits);
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  };

  //gpt3
  const onSubmitForm = async (values) => {
    let formData = values.input;
    let formType = values.type;
    setResponseRecieved(false);
    setResponseRecievedGPTJ(false);
    let uid;

    if (user?.uid) {
      uid = user?.uid;
    } else if (userUIDRedux) {
      uid = userUIDRedux;
    } else if (auth.currentUser?.uid) {
      uid = auth.currentUser?.uid;
    } else {
      uid = "1";
      console.log("no uid available :(");
    }
    await axios({
      method: "POST",
      url: "/api/openAI",
      data: {
        input: formData,
        user: uid,
        type: formType,
      },
      // headers: headers,
    })
      .then((response) => {
        // console.log("Status: " + response.status);
        // console.log("limit: " + response.headers?.get('X-RateLimit-Limit'));
        // console.log("remaining: " + response.headers?.get('X-RateLimit-Remaining'));

        setAiResponse(response.data.results);
        dispatch(gpt3OutputAction(aiResponse));
        setResponseRecieved(true);
        if(formType === "new"){

        deduct(1);
        }else{
          deduct(1.5);
        }
        setAiLoading(false);

        return response;
      })
      .catch((error) => {
        if (error.message === "Request failed with status code 429") {
          setResponseRecieved(true);
          setAiLoading(false);
          setAiResponse(
            "Rate limit exceeded, to many requests sent in one minute "
          );
          dispatch(gpt3OutputAction(aiResponse));
        } else {
          setResponseRecieved(true);
          setAiLoading(false);
          setAiResponse("Something went wrong. Please try again later.");
          dispatch(gpt3OutputAction(aiResponse));
        }

        // return "Sorry, an Error occured";
      });
  };

  //gptJ
  const onSubmitFormGptJ = async (values) => {
    let formData = values.input;
    let formType = values.type;
    setResponseRecievedGPTJ(false);
    setResponseRecieved(false);

    await axios({
      method: "POST",
      url: "/api/gptJ",
      data: {
        input: formData,
        type: formType,
      },
      // headers: headers,
    })
      .then((response) => {
        // console.log("index response");
        // console.log(response.data.results);
        setAiResponseGPTJ(response.data.results);
        setResponseRecievedGPTJ(true);
        if(formType === "new"){
        deduct(0.2);
        }else{
          deduct(0.4);
        }
        setAiLoading(false);
        dispatch(gptJOutputAction(aiResponseGPTJ));
        return response;
      })
      .catch((error) => {
        console.log(error);
        setAiLoading(false);
        setAiResponse("Something went wrong. Please try again later.");
        return "Sorry, an Error occured";
      });
  };

  // console.log(GPTJorGPT3);

  var gptJContent = (
    // <form onSubmit={handleSubmit(onSubmitFormGptJ)} className="w-full">
    <div className="flex flex-col items-center w-full">
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
      {/* <textarea
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
        ></textarea> */}
      <div className="flex justify-start w-full">
        <p className="pt-1 text-left text-md text-t-pd">Input:</p>
      </div>
      <TextareaAutosize
        className="w-[99%] rounded-md nun   textarea-tw"
        onChange={(e) => {
          // console.log(e.target.value);
          setGPTJInput(e.target.value);
        }}
        // defaultValue={contentTitle}
        placeholder="3-5 keywords about your problem"
        maxLength="150"
        value={GPTJInput}

        // {...register("input", { required: "Required" })}
      ></TextareaAutosize>
      {/* <GPT3TextArea /> */}
      {/* <p>{charLength + "/100"}</p> */}

      <div className="flex items-center justify-between w-full mt-1">
        <div className="flex items-center w-[13em] justify-center rounded-xl p-0 ring-t-pm bg-clear-pl3  gap-3 ring-2 h-10">
          <p
            className={
              GPTJorGPT3 ? "text-slate-500  line-through" : "!text-t-pm"
            }
          >
            GPT-3
          </p>
          <Toggle
            className=" fade-effect"
            defaultChecked={GPTJorGPT3}
            icons={false}
            onChange={() => {
              setGPTJorGPT3(!GPTJorGPT3);
            }}
          />
          <p
            className={
              GPTJorGPT3 ? "!text-t-pm" : "text-slate-500 line-through"
            }
          >
            GPT-J
          </p>
        </div>
        <div className="relative group">
          <div className="absolute transition duration-1000 rounded-full opacity-0 -inset-1 bg-gradient-to-r from-t-pl via-t-pm via-violet-400 to-t-pd blur-sm group-hover:opacity-100 group-hover:duration-200 animate-gradient-xy"></div>
          <button
            className="w-[8em] h-[2em] card__btn_next right-[50px] flex items-center justify-center md:hover:scale-105 md:transition-transform md:active:scale-95 fade-effect cursor-pointer !shadow-clear-pd3 md:hover:shadow-xl m-1 drop-shadow-xl !bg-gradient-to-br from-white via-t-pl  to-t-pm !shadow-2xl "
            type="submit"
            onClick={() => {
              if (aiLoading) {
                console.log("Please wait for the first request to load");
              } else {
                // setGPTJStatus(true);
                if (credits >= 0.2) {
                  setAiLoading(true);
                  setoldInput("")
                  onSubmitFormGptJ({ input: GPTJInput, type: "new" });
                } else {
                  setResponseRecieved(false);
                  setResponseRecievedGPTJ(false);
                  setoldInput("")
                  setAiResponse(
                    "No credits remaining, you can purchase more or upgrade your plan in the billing menu."
                  );
                  dispatch(gptJOutputAction(aiResponse));
                  setResponseRecieved(true);
                }
              }
            }}
          >
            {aiLoading ? (
              <>
                <p className="pl-2 text-t-pd">Sending...</p>

                <BsHourglassSplit
                  style={{ fontSize: "32px" }}
                  className="pl-2 text-t-pd"
                />
              </>
            ) : (
              <>
                <div className="flex flex-col items-center mt-2 leading-3">
                  <p className="pl-2 text-t-pd dark:text-t-pd">Send to AI</p>
                  <p className="pl-2 text-xs text-slate-500 dark:text-slate-500">
                    (0.2 Credits)
                  </p>
                </div>

                <BiSend
                  style={{ fontSize: "32px" }}
                  className="pl-2 text-t-pd"
                />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );

  var gpt3Content = (
    <div className="flex flex-col items-center">
      <div className="flex justify-start w-full">
        <p className="pt-1 text-left text-md text-t-pd">Input:</p>
      </div>
      <TextareaAutosize
        className="w-[99%] rounded-md nun   textarea-tw dark:!bg-slate-900/90 dark:text-white"
        // defaultValue={contentTitle}
        onChange={(e) => {
          // console.log(e.target.value)
          setGPT3Input(e.target.value);
        }}
        value={GPT3Input}
        placeholder="3-5 keywords about your problem"
        maxLength="150"
      ></TextareaAutosize>

      <div className="flex items-center justify-between w-full mt-1">
        <div className="flex items-center w-[13em] justify-center rounded-xl p-0 ring-t-pm bg-clear-pl3  gap-3 ring-2 h-10">
          <p
            className={
              GPTJorGPT3 ? "text-slate-500  line-through" : "!text-t-pm"
            }
          >
            GPT-3
          </p>
          <Toggle
            className=" fade-effect"
            defaultChecked={GPTJorGPT3}
            icons={false}
            onChange={() => {
              setGPTJorGPT3(!GPTJorGPT3);
            }}
          />
          <p
            className={
              GPTJorGPT3 ? "!text-t-pm" : "text-slate-500 line-through"
            }
          >
            GPT-J
          </p>
        </div>
        <div className="relative group">
          <div className="absolute transition duration-1000 rounded-full opacity-0 -inset-1 bg-gradient-to-r from-t-pl via-t-pm via-violet-400 to-t-pd blur-sm group-hover:opacity-100 group-hover:duration-200 animate-gradient-xy"></div>
          <button
            className="w-[8em] h-[2em] card__btn_next right-[50px] flex items-center justify-center md:hover:scale-105 md:transition-transform md:active:scale-95 fade-effect cursor-pointer !shadow-clear-pd3 md:hover:shadow-xl m-1 drop-shadow-xl !bg-gradient-to-br from-white via-t-pl  to-t-pm !shadow-2xl "
            type="submit"
            onClick={() => {
              if (aiLoading) {
                console.log("Please wait for the first request to load");
              } else {
                // setGPT3Status(true);
                if (credits >= 1) {
                  setAiLoading(true);
                  setoldInput("")
                  onSubmitForm({ input: GPT3Input, type: "new" });
                } else {
                  setResponseRecieved(false);
                  setResponseRecievedGPTJ(false);
                  setoldInput("")
                  setAiResponse(
                    "No credits remaining, you can purchase more or upgrade your plan in the billing menu."
                  );
                  dispatch(gpt3OutputAction(aiResponse));
                  setResponseRecieved(true);
                }
              }
            }}
          >
            {aiLoading ? (
              <>
                <p className="pl-2 text-t-pd dark:text-t-pd">Sending...</p>

                <BsHourglassSplit
                  style={{ fontSize: "32px" }}
                  className="pl-2 text-t-pd dark:text-t-pd"
                />
              </>
            ) : (
              <>
                <div className="flex flex-col items-center mt-2 leading-3">
                  <p className="pl-2 text-t-pd dark:text-t-pd">Send to AI</p>
                  <p className="pl-2 text-xs text-slate-500 dark:text-slate-500">
                    (1 Credit)
                  </p>
                </div>

                <BiSend
                  style={{ fontSize: "32px" }}
                  className="pl-2 text-t-pd"
                />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
    // </form>
  );

  var gptjButton = "GPT-J";
  var gpt3Button = "GPT-3";

  return (
    <div className="flex flex-col items-center max-w-[40em] relative">
      {showButton && !warning && (
        <div>
          {/* <button
            className="absolute -top-9 -right-5 w-[8em] h-[1.5em] card__btn_next  flex items-center justify-center md:hover:scale-105 md:transition-transform md:active:scale-95 fade-effect cursor-pointer !shadow-clear-pd3 md:hover:shadow-xl m-1 drop-shadow-xl !bg-gradient-to-br from-white via-t-pl  to-t-pm !shadow-2xl "
            onClick={() => {
              let concatArray = [];
              let concat = sArray.forEach((x) => {
                concatArray.push(x.text);
              });
              let sentence = concatArray.join(" ");
              let lowercase = sentence.toLowerCase();
              let capFirst =
                lowercase.charAt(0).toUpperCase() + lowercase.slice(1);
              if (GPTJorGPT3) {
                setGPTJInput(capFirst);
              } else {
                setGPT3Input(capFirst);
              }
            }}
          >
            <FaPlus className="text-sm" />{" "}
            <p className="text-sm">Current Sentence</p>{" "}
          </button> */}
        </div>
      )}

      {warning ? (
        <>
          {" "}
          <div className="flex flex-col w-full ">
            <div className="flex flex-col w-full ">
              <div className="flex items-center justify-between ai-output-box bg-white/80 min-h-[20em] dark:bg-slate-800/60">
                <h3 className="text-2xl text-gray-700 nun dark:text-t-pd">
                  {"AI Disclaimer"}
                </h3>
                <p className="text-gray-700">
                  {
                    "This feature is still in beta. You are interacting with AI, not a human. The AI can return some wild content, and anything returned from the AI does not represent the views of ideaisland. Use this feature at your own risk."
                  }
                </p>
                <button
                  className="w-[14em] h-[2em] card__btn_next right-[50px] flex items-center justify-center md:hover:scale-105 md:transition-transform md:active:scale-95 fade-effect cursor-pointer !shadow-clear-pd3 md:hover:shadow-xl m-1 drop-shadow-xl !bg-gradient-to-br from-white via-t-pl  to-t-pm !shadow-2xl "
                  onClick={() => {
                    setWarning(!warning);
                  }}
                >
                  <p className="pl-2 text-t-pd dark:text-t-pd">
                    Agree and Continue
                  </p>

                  <BsArrowRight
                    style={{ fontSize: "32px" }}
                    className="pl-2 text-t-pd"
                  />
                </button>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          {" "}
          <div className="flex flex-col w-full ">
            <div className="flex items-center w-full gap-2">
              <p className="pt-1 text-lg text-left text-t-pd">{credits}</p>
              <p className="pt-1 text-xs text-left text-t-pd">
                Credits Remaining
              </p>
            </div>

            {GPTJorGPT3 ? gptJContent : gpt3Content}
          </div>
          <div className="flex flex-col w-full ">
            <p className="pt-2 text-left text-md text-t-pd">Results:</p>

            <div className="flex items-center w-full text-left ai-output-box bg-white/80 dark:bg-slate-800/60 min-w-30em">

              {oldInput.length > 0 && <p>{oldInput.trimStart() + " "}</p>}
              <Loader show={aiLoading} />

              {responseRecieved && <p>{aiResponse.trimStart()}</p>}
              {!responseRecieved && !responseRecievedGPTJ && !aiLoading && (
                <p className="text-gray-400">{"AI output will display here"}</p>
              )}

              {responseRecievedGPTJ && <p>{aiResponseGPTJ.trimStart()}</p>}
            </div>

            <div className="flex justify-center w-full mt-2">
              <button
                className="w-[12em] h-[2em] card__btn_next right-[50px] flex items-center justify-center md:hover:scale-105 md:transition-transform md:active:scale-95 fade-effect  cursor-pointer !shadow-clear-pd3 md:hover:shadow-xl m-1 drop-shadow-xl !bg-gradient-to-br from-white via-t-pl  to-t-pm !shadow-2xl "
                onClick={() => {
                  if (aiLoading) {
                    console.log("Please wait for the first request to load");
                  } else {
                    if (GPTJorGPT3) {
                      setoldInput(aiResponseGPTJ)
                      //  setGPTJStatus(true);
                      setAiLoading(true);
                      onSubmitFormGptJ({ input: aiResponseGPTJ, type: "expand" });
                    } else {
                      //  setGPT3Status(true);
                      setoldInput(oldInput + " " +aiResponse)

                      setAiLoading(true);
                      onSubmitForm({ input: aiResponse, type: "expand" });
                    }
                  }
                }}
              >
                {aiLoading && oldInput.length > 0  ? (
                  <>
                    <p className="text-lg text-t-pd">Expanding...</p>{" "}
                  </>
                ) : (
                  <>
                    <p className="text-lg text-t-pd dark:text-t-pd">
                      Expand Answer
                    </p>
                    <p className="ml-2 text-xs text-slate-600 dark:text-slate-600">
                      {GPTJorGPT3 ? "(0.4 credits)" : "(1.5 credits)"}
                    </p>
                  </>
                )}
              </button>
            </div>
          </div>
        </>
      )}
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
