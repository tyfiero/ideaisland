import { React, useState, useContext } from "react";
import { UserContext } from "../../../lib/context";
import {
  FaLongArrowAltLeft,
  FaLongArrowAltRight,
} from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import TextareaAutosize from "react-textarea-autosize";
import toast from "react-hot-toast";
import { pFormAction } from "../../../redux/actions";

function ProblemProgressPage(props) {
  const pFormRedux = useSelector((state) => state.pForm);
  const userNameRedux = useSelector((state) => state.userName);
  const userUIDRedux = useSelector((state) => state.userUID);
  const { user, username } = useContext(UserContext);

  const [contentWhy, setContentWhy] = useState(pFormRedux.why);
  const [contentWhat, setContentWhat] = useState(pFormRedux.what);
  const [contentWho, setContentWho] = useState(pFormRedux.who);
  const [contentPq1, setContentPq1] = useState(pFormRedux.pq1);
  const [contentPq2, setContentPq2] = useState(pFormRedux.pq2);
  const [contentPq3, setContentPq3] = useState(pFormRedux.pq3);
  const [contentTitle, setContentTitle] = useState(pFormRedux.title);
  const [changes, setChanges] = useState(false);
  const dispatch = useDispatch();

  const router = useRouter();

  const saveOrContinue = (e) => {
    router.push("/solutions");
  };

  return (
    <div>
      <div
        className="flex items-center justify-center  px-4 pt-[1rem] sm:px-6 lg:px-8 drop-shadow-xl fade-effect-quick mb-20
"
      >
        <div className="w-full max-w-[95%]  space-y-8   normal-box-soft p-3">
          <div className="flex flex-col items-center justify-center gap-1 p-0 problem-page fade-effect-quick">
            <h1 className="text-3xl text-t-bd dark:text-blues-100">
              Progress so far:
            </h1>
            <div className="flex flex-col w-full gap-4">
              <div className="p-5 normal-box-soft !rounded-xl w-full group">
                <h3 className="heading">{contentTitle}</h3>
              </div>

              <div className="flex flex-wrap justify-center gap-4">
                <div className="p-5 normal-box-soft !rounded-xl md:min-w-[25em] md:max-w-[40em] group !bg-clear-bl2">
                  <h3 className="heading"> Why:</h3>
                  {/* <hr className="border-t-bd"></hr> */}
                  <div className="w-full glass-box bg-[rgba(255, 255, 255, 0.25)] dark:bg-black/80    flex flex-wrap gap-1 mb-3 justify-center">
                    {pFormRedux.whyOptions?.map((data, index) => (
                      <ListItem name={data} key={index} />
                    ))}
                  </div>
                  <div className="w-full glass-box dark:bg-black/80 bg-white/90">
                    <p>{contentWhy}</p>
                  </div>
                </div>
                <div className="p-5 normal-box-soft !rounded-xl w-[35em] group !bg-clear-pl3">
                  <h3 className="heading"> What:</h3>
                  {/* <hr className="border-t-bd"></hr> */}
                  <div className="w-full glass-box dark:bg-black/80 bg-white/90">
                    <p>{contentWhat}</p>
                  </div>
                </div>
                <div className="p-5 normal-box-soft !rounded-xl w-[35em] group !bg-clear-bpop1">
                  <h3 className="heading">Who:</h3>
                  <div className="w-full glass-box dark:bg-black/80 bg-white/90">
                    <p>{contentWho}</p>
                  </div>
                </div>
                <div className="p-5 normal-box-soft !rounded-xl md:min-w-[35em] sm:min-w-full group !bg-clear-pm2">
                  <h3 className="heading"> Problem:</h3>
                  {/* <hr className="border-t-bd"></hr> */}
                  <div className="flex flex-col gap-1">
                    <p className="mt-4 text-xl text-white">
                      Problem you want to solve:
                    </p>

                    <div className="w-full glass-box dark:bg-black/80 bg-white/90">
                      <p>{contentPq1}</p>
                    </div>

                    <p className="mt-4 text-xl text-white">Potential Cause:</p>

                    <div className="w-full glass-box dark:bg-black/80 bg-white/90">
                      <p>{contentPq2}</p>
                    </div>
                    <p className="mt-4 text-xl text-white">Root Cause:</p>

                    <div className="w-full glass-box dark:bg-black/80 bg-white/90">
                      <p>{contentPq3}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col">
              <div className="md:my-8 sm:my-4 md:mb-[5em] glass-box bg-[rgba(255, 255, 255, 0.25)] dark:bg-[hsla(200,0%,5%,0.35)]  ">
                <p className="text-xl text-t-bd">
                  You&apos;ve come a long way! Now is when the real fun starts.
                  It&apos;s time to ideate. 💡
                </p>
              </div>
              <div className="flex justify-center w-full mt-[2em]">
                <img
                  src="../island-pic.png"
                  alt="palm"
                  className="absolute  -bottom-[20rem] scale-[0.3] -z-10"
                />
              </div>
            </div>

            <div className="flex items-center justify-between w-full sm:mb-4md:mb-8">
              <button
                className="card__btn_prev save_button left-[5%]  flex items-center justify-center md:hover:scale-105 md:transition-transform md:active:scale-95 fade-effect-quick"
                onClick={() => router.push("/problem#Details")}
              >
                <FaLongArrowAltLeft className="mr-1 text-[24px]" />
                Back
              </button>

              <div className="relative group">
                <div className="absolute transition duration-1000 rounded-full opacity-0 -inset-1 bg-gradient-to-r from-t-pl via-t-bl to-t-bpop blur-sm group-hover:opacity-100 group-hover:duration-200 animate-gradient-xy"></div>
                <button
                  className="md:w-[16em] sm:h-[3em] sm:px-2 md:h-[4em] card__btn_next right-[50px] flex items-center justify-center md:hover:scale-105 md:transition-transform md:active:scale-95 fade-effect cursor-pointer shadow-clear-bd3 md:hover:shadow-xl m-1 drop-shadow-xl "
                  onClick={saveOrContinue}
                >
                  Continue
                  <FaLongArrowAltRight className="ml-1 text-[34px]" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ProblemProgressPage;

function ListItem({ name }) {
  return (
    <div className="flex items-center justify-between px-2 py-1 bg-clear-bl3 w-fit rounded-xl">
      <p>{name}</p>
      {/* <FaTimes
        className="transition cursor-pointer text-t-pm md:hover:scale-125 md:active:scale-110"
        onClick={() => deleteIndex(name)}
      /> */}
    </div>
  );
}
