import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../../lib/context";
import Step from "../../components/Devlab/Step";
import StepWizard from "react-step-wizard";
import { ThoughtRoute } from "../../components/Devlab/ThoughtRoutes";
import ThoughtToolBar from "../../components/Devlab/ThoughtToolBar";
import dynamic from "next/dynamic";
import { AiOutlineFullscreen } from "react-icons/ai";
import JourneyStep from "../../components/Devlab/JourneyStep";
import { useSelector, useDispatch } from "react-redux";
import {
  serverTimestamp,
  doc,
  getFirestore,
  updateDoc,
  setDoc,
} from "firebase/firestore";
import { auth } from "../../lib/firebase";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import { currentJourneyAction } from "../../redux/actions";
import JourneyToolBar from "../../components/Devlab/JourneyToolBar";
import LastSlide from "../../components/Devlab/LastSlide";

let networkEffects = [
  {
    title: "Platform Selection",
    text: "What platforms do you know well? Or what platforms do you think could be improved?",
    subtext: "Where is your niche congregating online? ",
    popupText: "",
    placeholder: "Facebook, Reddit, IndieHacker, etc.",
    response: null,
    num: 1,
  },
  {
    title: "Platform Strengths",
    text: "What is this platform good for?",
    subtext:
      "List out what the platform excels at, to  identify what doesn't need changing.",
    popupText: "",
    placeholder:
      "Reddit is great for bringing niche communities together and...",
    response: null,
    num: 2,
  },
  {
    title: "Platform Weaknesses",
    text: "What is the platform not good for? ",
    subtext:
      "What features is it lacking? What frustrations do you experience using it? ",
    popupText: "",
    placeholder:
      "Reddit communities can become echo chambers and turn toxic...",
    response: null,
    num: 3,
  },
  {
    title: "Dig Deeper",
    text: "Is there a logical extension of the platforms into an area they don't currently serve?",
    subtext:
      "Could it be integrated with another service to improve the experience? Is it missing a key feature of another application?",
    popupText: "",
    placeholder:
      "Reddit could be improved by offering a feature or service that...",
    response: null,
    num: 4,
  },
  {
    title: "Specifics",
    text: "How could the platform be better at one specific thing?",
    subtext:
      "Could the platform do one thing better? What if the platform was world class at ___?",
    popupText: "",
    placeholder:
      "Reddit's DM feature is lacking, and could learn from slack by...",
    response: null,
    num: 5,
  },
  {
    title: "Nichify",
    text: "How could you create a feature that allows the platform to better serve a particular niche or subset of users?",
    subtext:
      "How could the platform be more inclusive? Or have a better user experience for a particular community?",
    popupText: "",
    placeholder:
      "Reddit could serve entrepreneurs better by offering better Ad services...",
    response: null,
    num: 6,
  },
  {
    title: "Shiny New Features",
    text: "What feature would you be willing to pay more for on the platform? ",
    subtext:
      'What would a "premium" tier subscription look like? What feature what make it stand out from the rest?',
    popupText: "",
    placeholder:
      "Reddit should offer a plan for entrepreneurs for better research capabilities... ",
    response: null,
    num: 7,
  },
  {
    title: "Exploration",
    text: "Is there any inspiration in existing extensions to the platform? ",
    subtext:
      "Take a second and search for the marketplace/integration/extension library for the platform. What is popular? What's missing? ",
    popupText: "",
    placeholder: "Reddit research is under served in the SaaS community...",
    response: null,
    num: 8,
  },
];

function NetworkEffects(props) {
  const { user, username } = useContext(UserContext);

  const [changes, setChanges] = useState(false);
  const [reset, setReset] = useState(false);
  const [loadData, setLoadData] = useState(false);
  const [fullScreen, setFullScreen] = useState(false);
  const [journey, setJourney] = useState(networkEffects);
  const currentJourney = useSelector((state) => state.currentJourney);
  const userUIDRedux = useSelector((state) => state.userUID);
  const userNameRedux = useSelector((state) => state.userName);
  const router = useRouter();
  const dispatch = useDispatch();

  const saveAnswers = async (e) => {
    e?.preventDefault() || null;
    let uid;

    if (user?.uid) {
      uid = user?.uid;
    } else if (userUIDRedux) {
      uid = userUIDRedux;
    } else if (auth.currentUser?.uid) {
      uid = auth.currentUser?.uid;
    } else {
      uid = "default";
      console.log("no uid available :(");
    }
    // if (!currentJourney.id) {
    const d = Number(new Date());
    const timeID = d.valueOf().toString();
    const ref = doc(getFirestore(), "users", uid, "journeys", timeID);
    // Tip: give all fields a default value here
    const data = {
      id: timeID,
      // title: currentJourney.title,
      kind: "Leveraging Network Effects",
      uid,
      username: userNameRedux,
      results: currentJourney.results,

      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };
    await setDoc(ref, data)
      .then(() => {
        // if (!currentJourney.id) {
        //   let updated = currentJourney;
        //   updated.id = timeID;
        //   dispatch(currentJourney(updated));
        // }
        toast.success("Progress saved!");
        // props.setChanges(false);
        router.push("/devlab/journey-explorer");
      })
      .catch((error) => {
        toast.error("Error occured :( ");
        console.log("It failed!" + error);
      });
    // } else {
    //   const ref = doc(getFirestore(), "users", uid, "problem", pFormRedux.id);

    //   const data = {
    //     id: pFormRedux.id,
    //     title: pFormRedux.title,
    //     productType: pFormRedux.productType,
    //     whyOptions: pFormRedux.whyOptions,
    //     why: pFormRedux.why,
    //     what: pFormRedux.what,
    //     who: pFormRedux.who,
    //     pq1: pFormRedux.pq1,
    //     pq2: pFormRedux.pq2,
    //     pq3: pFormRedux.pq3,
    //     updatedAt: serverTimestamp(),
    //   };
    //   await updateDoc(ref, data)
    //     .then(() => {
    //       toast.success("Progress saved!");
    //       props.setChanges(false);
    //       router.push("/devlab/journey-explorer");
    //     })
    //     .catch((error) => {
    //       toast.error("Error occured :( ");
    //       console.log("It failed!" + error);
    //     });
    // }
  };

  // Do something on step change
  // const onStepChange = (stats) => {
  //   // console.log(stats);
  // };

  const [state, updateState] = useState({
    form: {},
    // demo: true, // uncomment to see more
  });
  const { SW } = state;

  const setInstance = (SW) =>
    updateState({
      ...state,
      SW,
    });

  /* Get the element you want displayed in fullscreen mode (a video in this example): */
  // const spaceWindow= useRef(null)

  /* When the openFullscreen() function is executed, open the video in fullscreen.
  Note that we must include prefixes for different browsers, as they don't support the requestFullscreen method yet */
  // const fullScreen = () =>{
  //   if (spaceWindow.requestFullscreen) {
  //     spaceWindow.requestFullscreen();
  //   } else if (spaceWindow.webkitRequestFullscreen) { /* Safari */
  //   spaceWindow.webkitRequestFullscreen();
  //   } else if (spaceWindow.msRequestFullscreen) { /* IE11 */
  //   spaceWindow.msRequestFullscreen();
  //   }
  // }

  return (
    <div
      className={
        " w-full h-full relative" +
        (fullScreen ? " fixed top-0 left-0 w-full h-full z-[1000]" : " ")
      }
    >
      {/* <Earth /> */}
      <div
        className={
          "  w-full h-full" +
          (fullScreen
            ? " fixed top-0 left-0 w-full h-full -z-[20]"
            : " absolute")
        }
      >
        <img
          src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470"
          alt="background image of apps"
        />
      </div>

      <JourneyToolBar
        SW={SW}
        fullScreen={fullScreen}
        setFullScreen={setFullScreen}
      />
      {/* <AiOutlineFullscreen  onClick={fullScreen} className="scale-50 cursor-pointer text-t-pm md:hover:scale-150"/> */}
      <StepWizard
        // onStepChange={onStepChange}
        isHashEnabled
        // isLazyMount={true}
        initialStep={1}
        //  transitions={state.transitions} // comment out for default transitions
        // nav={<ProgressStepper />}
        instance={setInstance}
      >
        {journey?.map((data, index) => (
          <JourneyStep
            key={index}
            num={data.num}
            hashKey={data.urlHash}
            setChanges={setChanges}
            reset={reset}
            setReset={setReset}
            loadData={loadData}
            setLoadData={setLoadData}
            heading={data.title}
            text={data.text}
            subtext={data.subtext}
            buttonText={data.buttonText}
            buttonText2={data.buttonText2}
            popupText={data.popupText}
            placeholder={data.placeholder}
            saveAnswers={saveAnswers}
          />
        ))}

        <LastSlide hashKey={"results"} />
      </StepWizard>
    </div>
  );
}

export default NetworkEffects;
