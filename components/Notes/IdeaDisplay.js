import Stars from "./Stars";
import {
  FaEdit,
  FaExternalLinkAlt,
  FaImage,
} from "react-icons/fa";
import {
  useEffect,
  useState,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { editModeAction, sFormAction } from "../../redux/actions";
import sanitize from "../../lib/sanitize";
import ChipFeature from "../MainPage/solutionsComponents/CombinatorialComponents/ChipFeature";
import ChipTechStackDisplay from "../MainPage/solutionsComponents/CombinatorialComponents/ChipTechStackDisplay";
import { MdOutlineUpgrade } from "react-icons/md";
import { useRouter } from "next/router";
import DisplayImage from "./DisplayImage";

export default function IdeaDisplay(props) {
  const currentDocRedux = useSelector((state) => state.currentDoc);
  const sFormRedux = useSelector((state) => state.sForm);
  const router = useRouter();
  const [isPic, setIsPic] = useState(false);
  const dispatch = useDispatch();
  let type = props.type;
 
  
  useEffect(() => {
    if (currentDocRedux) {
      if (currentDocRedux.imgUrl?.length > 0) {
        setIsPic(true);
      } else {
        setIsPic(false);
      }
    }
  }, [currentDocRedux]); // eslint-disable-line react-hooks/exhaustive-deps



  return (
    <div className="flex flex-col items-center w-full fade-effect-quick">
      {isPic ? (
        <DisplayImage type={type} mode="display" />
      ) : (
        <button
          onClick={() => {
            setIsPic(true);
          }}
          className="fixed flex items-center justify-center w-[8em]  gap-2 h-8 rounded-full bg-white/60 md:hover:scale-105 top-2 left-6"
        >
          {" "}
          <FaImage className="text-t-bl" />
          Add Image
        </button>
      )}

      <div className="text-t-bd text-[28px] p-5 mt-3">
        <h2 className="mx-3 ">{currentDocRedux?.title || "*Unnamed Idea"}</h2>
      </div>

      <div
        className={
          "flex items-center my-2  w-[98%] " +
          (type === "ideas" ? "justify-between" : "justify-end")
        }
      >
        {type === "ideas" && (
          <>
            <div className="flex items-center gap-1 sm:scale-75 md:scale-100">
              <p className="text-[22px] text-t-bd">Rating</p>
              <Stars hover={false} rating={currentDocRedux?.rating} />
            </div>
            {/* <div>
              {currentDocRedux?.published ? (
                <div className="flex items-center gap-1">
                  <FaGlobeAmericas className="text-t-bl" />
                  <p className="text-t-bl">Public&nbsp;&nbsp; </p>
                </div>
              ) : (
                <div className="flex items-center gap-1">
                  <FaLock className="text-t-pd" />
                  <p className="text-t-pd">Private</p>
                </div>
              )}
            </div> */}
          </>
        )}

        <div className="flex items-center gap-2">
          <div>
            <button
              onClick={() => {
                let newRef = sFormRedux;
                newRef.idea = currentDocRedux;

                dispatch(sFormAction(newRef));
                router.push("/solutions/improve#add-features");
              }}
              className=" sm:px-2 md:px-3 h-[2em] rounded-3xl bg-t-pm flex items-center justify-center text-white gap-2 sm:gap-1 drop-shadow-xl md:hover:scale-105 md:transition-transform md:active:scale-95 cursor-pointer "
            >
              <>
                <MdOutlineUpgrade className="text-[24px]" /> Improve
              </>
              {/* {currentDocRedux?.features?.length === 0 ? <><MdOutlineUpgrade className="text-[24px]" /> Improve Idea </> : <><FaExternalLinkAlt className="text-[18px]" /> Edit Improved Idea </>} */}
            </button>
          </div>
          <button
            className=" px-2 md:px-3 h-[2em] rounded-3xl bg-t-bl flex items-center justify-center text-white gap-4 drop-shadow-xl md:hover:scale-105 md:transition-transform md:active:scale-95 cursor-pointer"
            onClick={() => {
              dispatch(editModeAction("edit"));
            }}
          >
            <FaEdit />
            Edit
          </button>
        </div>
      </div>

      <div
        className={
          "normal-box-soft w-full !rounded-2xl first-letter: -z-10" +
          (type === "ideas" ? " !bg-clear-bl2" : " !bg-slate-300/60")
        }
      >
        <div className="normal-box bg-[hsla(200,0%,100%,0.764)]  dark:bg-[hsla(200,0%,20%,0.764)] mt-1 mx-1 min-h-[5em] !rounded-2xl mb-4 ">
          <div
            className="mx-2"
            dangerouslySetInnerHTML={{
              __html: sanitize(currentDocRedux?.content, {
                USE_PROFILES: { html: true },
              }),
            }}
          ></div>
        </div>

        {currentDocRedux?.features && (
          <div className="flex flex-col">
            <p className="text-left">Features:</p>
            <div className="flex flex-wrap items-center justify-center gap-2 normal-box-soft -z-[2]">
              {currentDocRedux?.features.map((feature, index) => (
                <ChipFeature
                  cost={feature.cost}
                  comments={feature.comments}
                  name={feature.name}
                  feasibility={feature.feasibility}
                  importance={feature.importance}
                  version={feature.version}
                  key={index}
                />
              ))}
              {currentDocRedux?.features.length === 0 && (
                <p>No features added yet.</p>
              )}
            </div>
          </div>
        )}
        {currentDocRedux?.features && (
          <div className="flex flex-col">
            <p className="text-left">Tech Stack:</p>
            <div className="flex flex-col items-center justify-center normal-box-soft -z-[2]">
              <div className="flex flex-wrap items-center justify-center gap-2 ">
                {currentDocRedux?.techStack.map((tool, index) => (
                  <ChipTechStackDisplay
                    cost={tool.cost}
                    name={tool.name}
                    type={tool.type}
                    kind={tool.kind}
                    key={index}
                  />
                ))}
              </div>
              {currentDocRedux?.techStack.length === 0 ? (
                <p>No tech stack selected.</p>
              ) : (
                <div className="flex gap-5 mt-2">
                  <p className="text-sm ">
                    Monthly Cost:{" "}
                    {currentDocRedux?.stackCost[0]?.monthly > 0
                      ? "$" + currentDocRedux?.stackCost[0].monthly
                      : "Free"}
                  </p>
                  <p className="text-sm ">
                    Annual Cost:{" "}
                    {currentDocRedux?.stackCost[1]?.yearly > 0
                      ? "$" + currentDocRedux?.stackCost[1].yearly
                      : "Free"}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}