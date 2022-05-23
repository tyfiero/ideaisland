import { useState, useEffect, useContext } from "react";
import { UserContext } from "../../../lib/context";

import TextareaAutosize from "react-textarea-autosize";
import axios from "axios";
import { auth } from "../../../lib/firebase";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../../Layout/Loader";

function CanvasSection({ title, kind, description, qContext }) {
  const { user, username, aiCredits } = useContext(UserContext);
  const userUIDRedux = useSelector((state) => state.userUID);

  const [text, setText] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const [responseRecieved, setResponseRecieved] = useState(false);
  const [credits, setCredits] = useState(0);




  useEffect(() => {
    if(aiCredits){
        setCredits(aiCredits);
    }

  }, [aiCredits]);

  
  const sendToAI = async (data) => {
    // let formData = values.input;
    // let formType = values.type;
    setResponseRecieved(false);
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
        input: data.input,
        user: uid,
        type: "plan",
        kind: kind,
      },
      // headers: headers,
    })
      .then((response) => {
        // console.log("Status: " + response.status);
        // console.log("limit: " + response.headers?.get('X-RateLimit-Limit'));
        // console.log("remaining: " + response.headers?.get('X-RateLimit-Remaining'));

        setText(response.data.results.trimStart());
        // dispatch(gpt3OutputAction(aiResponse));
        setResponseRecieved(true);
        // if(formType === "new"){

        // deduct(1);
        // }else{
        //   deduct(1.5);
        // }
        setAiLoading(false);

        return response;
      })
      .catch((error) => {
        if (error.message === "Request failed with status code 429") {
          setResponseRecieved(true);
          setAiLoading(false);
          setText("Rate limit exceeded, to many requests sent in one minute ");
          //   dispatch(gpt3OutputAction(aiResponse));
        } else {
          setResponseRecieved(true);
          setAiLoading(false);
          setText("Something went wrong. Please try again later.");
          //   dispatch(gpt3OutputAction(aiResponse));
        }

        // return "Sorry, an Error occured";
      });
  };
  return (
    <div className="relative flex flex-col p-5 ring-2 ring-2-bl rounded-xl group">
      <h3>{title}</h3>
      <p className="text-sm">{description}</p>
      <button className="absolute top-0 right-0 px-2 nun text-base py-1 card__btn_next  flex items-center justify-center md:hover:scale-105  md:active:scale-95 fade-effect cursor-pointer !shadow-clear-pd3 md:hover:shadow-xl m-1 drop-shadow-xl !bg-gradient-to-br from-white via-t-pl  to-t-pm !shadow-2xl opacity-0 group-hover:opacity-100 transition duration-500"
       onClick={() => {
        if (aiLoading) {
          console.log("Please wait for the first request to load");
        } else {
          // setGPT3Status(true);
          if (credits >= 1) {
            setAiLoading(true);
            // setoldInput("")
            sendToAI({ input: qContext, type: "new", kind: kind });
          } else {
            setResponseRecieved(false);
            // setoldInput("")
            setText(
              "No credits remaining, you can purchase more or upgrade your plan in the billing menu."
            );
            // dispatch(gpt3OutputAction(aiResponse));
            setResponseRecieved(true);
          }
        }
      }}>
        <div className="flex flex-col items-center mt-2 leading-3">
          <p className="pl-2 text-t-pd dark:text-t-pd">Ask AI</p>
          <p className="pl-2 text-xs text-slate-500 dark:text-slate-500">
            1 Credit
          </p>
        </div>
      </button>
      <div className="absolute left-[50%] top-[50%]"> <Loader show={aiLoading} /></div>
      <TextareaAutosize
        className="w-full h-auto textarea-tw min-h-[10em]"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="..."
        > 
      </TextareaAutosize>
    </div>
  );
}

export default CanvasSection;
