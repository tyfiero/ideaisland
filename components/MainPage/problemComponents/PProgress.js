import { React, useState } from "react";
import {
  FaBuilding,
  FaLaptopCode,
  FaQuestion,
  FaShoppingBag,
  FaLongArrowAltLeft,
  FaLongArrowAltRight,
  FaCheck,
  FaEdit,
  FaInfoCircle,
} from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";

import TextareaAutosize from "react-textarea-autosize";
import {
  serverTimestamp,
  query,
  where,
  collection,
  orderBy,
  doc,
  getFirestore,
  updateDoc,
  addDoc,
  onSnapshot,
  deleteDoc,
  setDoc,
  getDoc,
} from "firebase/firestore";
import { firestore, auth } from "../../../lib/firebase";
import toast from "react-hot-toast";
import { pFormAction } from "../../../redux/actions";

function ProblemProgressPage(props) {
  const pFormRedux = useSelector((state) => state.pForm);
  const userNameRedux = useSelector((state) => state.userName);
  const userUIDRedux = useSelector((state) => state.userUID);

  const [contentWhy, setContentWhy] = useState(pFormRedux.why);
  const [contentWhat, setContentWhat] = useState(pFormRedux.what);
  const [contentWho, setContentWho] = useState(pFormRedux.who);
  const [contentPq1, setContentPq1] = useState(pFormRedux.pq1);
  const [contentPq2, setContentPq2] = useState(pFormRedux.pq2);
  const [contentPq3, setContentPq3] = useState(pFormRedux.pq3);
  const [contentTitle, setContentTitle] = useState(pFormRedux.title);

  const [editWhy, setEditWhy] = useState(false);
  const [editWhat, setEditWhat] = useState(false);
  const [editWho, setEditWho] = useState(false);
  const [editProblem, setEditProblem] = useState(false);
  const [editTitle, setEditTitle] = useState(false);

  const [changes, setChanges] = useState(false);
  const dispatch = useDispatch();

  const router = useRouter();

  const saveOrContinue = async (e) => {

    //update firestore problem
    e?.preventDefault() || null;

    if (changes) {
      let uid;
      if (props.cookieUID) {
        uid = props.cookieUID;
      } else {
        if (userUIDRedux) {
          uid = userUIDRedux;
          console.log("it actually worked");
        } else if (auth.currentUser?.uid) {
          uid = auth.currentUser.uid;
        } else {
          uid = null;
          console.log("no uid available :(");
        }
      }
      

      const ref = doc(
        getFirestore(),
        "users",
        uid,
        "problem",
        pFormRedux.id
      );

      const data = {
        title: contentTitle,
        productType: pFormRedux.productType || null,
        whyOptions: pFormRedux.whyOptions || null,
        why: contentWhy,
        what: contentWhat,
        who: contentWho,
        pq1: contentPq1,
        pq2: contentPq2,
        pq3: contentPq3,
        updatedAt: serverTimestamp(),
      };
      // console.log(timeID);

      await updateDoc(ref, data)
        // await addDoc(collection(getFirestore(), "users", uid, "ideas"), data)
        .then(() => {
          toast.success("Edits saved!");
          setChanges(false);

          router.push("/solutions");
        })
        .catch((error) => {
          toast.error("Error occured :( ");
          console.log("It failed!" + error);
        });
    } else {
      router.push("/solutions");
    }
  };

  return (
    <div>
      <div
        className="flex items-center justify-center  px-4 pt-[1rem] sm:px-6 lg:px-8 drop-shadow-xl fade-effect-quick mb-20
"
      >
        <div className="w-full max-w-[95%]  space-y-8   normal-box-soft p-3">
          <div className="flex flex-col items-center justify-center p-0 problem-page fade-effect-quick">
            <h1 className="heading-top">Progress so far:</h1>
            <div className="flex flex-col w-full gap-4">
              <div className="p-5 normal-box-soft !rounded-xl w-full group">
                <button
                  className="absolute flex items-center gap-1 p-1 px-2 text-white transition duration-500 opacity-0 bg-t-bl rounded-2xl group-hover:opacity-100 hover:scale-110 active:scale-95"
                  onClick={() => setEditTitle(!editTitle)}
                >
                  {!editTitle ? (
                    <>
                      <p>Edit</p>
                      <FaEdit />
                    </>
                  ) : (
                    <>
                      {" "}
                      <p>Done</p> <FaCheck />
                    </>
                  )}{" "}
                </button>
                {/* <hr className="border-t-bd"></hr> */}
                {editTitle ? (
                  <TextareaAutosize
                    className="w-[95%] rounded-md ml-20"
                    defaultValue={contentTitle}
                    placeholder="..."
                    onChange={(e) => {
                      setContentTitle(e.target.value);
                      let updated = pFormRedux;
                      updated.title = e.target.value;
                      dispatch(pFormAction(updated));
                      setChanges(true);
                    }}
                  ></TextareaAutosize>
                ) : (
                  <h3 className="heading">{contentTitle}</h3>
                )}
              </div>
              <div className="flex flex-wrap justify-center gap-4">
                <div className="p-5 normal-box-soft !rounded-xl min-w-[25em] group !bg-t-bl/10">
                  <button
                    className="absolute flex items-center gap-1 p-1 px-2 text-white transition duration-500 opacity-0 bg-t-bl rounded-2xl group-hover:opacity-100 hover:scale-110 active:scale-95"
                    onClick={() => setEditWhy(!editWhy)}
                  >
                    {!editWhy ? (
                      <>
                        <p>Edit</p>
                        <FaEdit />
                      </>
                    ) : (
                      <>
                        {" "}
                        <p>Done</p> <FaCheck />
                      </>
                    )}{" "}
                  </button>
                  <h3 className="heading"> Why:</h3>
                  {/* <hr className="border-t-bd"></hr> */}
                  <div className="w-full glass-box !bg-white/90">
                    {editWhy ? (
                      <TextareaAutosize
                        className="w-full rounded-md"
                        defaultValue={contentWhy}
                        placeholder="..."
                        onChange={(e) => {
                          setContentWhy(e.target.value);
                          let updated = pFormRedux;
                      updated.why = e.target.value;
                      dispatch(pFormAction(updated));
                          setChanges(true);
                        }}
                      ></TextareaAutosize>
                    ) : (
                      <p>{contentWhy}</p>
                    )}
                  </div>
                </div>
                <div className="p-5 normal-box-soft !rounded-xl w-[35em] group !bg-t-pl/30">
                  <button
                    className="absolute flex items-center gap-1 p-1 px-2 text-white transition duration-500 opacity-0 bg-t-bl rounded-2xl group-hover:opacity-100 hover:scale-110 active:scale-95"
                    onClick={() => setEditWhat(!editWhat)}
                  >
                    {!editWhat ? (
                      <>
                        <p>Edit</p>
                        <FaEdit />
                      </>
                    ) : (
                      <>
                        {" "}
                        <p>Done</p> <FaCheck />
                      </>
                    )}{" "}
                  </button>

                  <h3 className="heading"> What:</h3>
                  {/* <hr className="border-t-bd"></hr> */}
                  <div className="w-full glass-box !bg-white/90">
                    {editWhat ? (
                      <TextareaAutosize
                        className="w-[95%] rounded-md"
                        defaultValue={contentWhat}
                        placeholder="..."
                        onChange={(e) => {
                          setContentWhat(e.target.value);
                          let updated = pFormRedux;
                      updated.what = e.target.value;
                      dispatch(pFormAction(updated));
                          setChanges(true);
                        }}
                      ></TextareaAutosize>
                    ) : (
                      <p>{contentWhat}</p>
                    )}
                  </div>
                </div>
                <div className="p-5 normal-box-soft !rounded-xl w-[35em] group !bg-t-bpop/20">
                  <button
                    className="absolute flex items-center gap-1 p-1 px-2 text-white transition duration-500 opacity-0 bg-t-bl rounded-2xl group-hover:opacity-100 hover:scale-110 active:scale-95"
                    onClick={() => setEditWho(!editWho)}
                  >
                    {!editWho ? (
                      <>
                        <p>Edit</p>
                        <FaEdit />
                      </>
                    ) : (
                      <>
                        {" "}
                        <p>Done</p> <FaCheck />
                      </>
                    )}{" "}
                  </button>
                  <h3 className="heading">Who:</h3>
                  {/* <hr className="border-t-bd"></hr> */}
                  <div className="w-full glass-box !bg-white/90">
                    {editWho ? (
                      <TextareaAutosize
                        className="w-[95%] rounded-md"
                        defaultValue={contentWho}
                        placeholder="..."
                        onChange={(e) => {
                          setContentWho(e.target.value);
                          let updated = pFormRedux;
                      updated.who = e.target.value;
                      dispatch(pFormAction(updated));
                          setChanges(true);
                        }}
                      ></TextareaAutosize>
                    ) : (
                      <p>{contentWho}</p>
                    )}
                  </div>
                </div>
                <div className="p-5 normal-box-soft !rounded-xl min-w-[35em] group !bg-t-pm/20">
                  <button
                    className="absolute flex items-center gap-1 p-1 px-2 text-white transition duration-500 opacity-0 bg-t-bl rounded-2xl group-hover:opacity-100 hover:scale-110 active:scale-95"
                    onClick={() => setEditProblem(!editProblem)}
                  >
                    {!editProblem ? (
                      <>
                        <p>Edit</p>
                        <FaEdit />
                      </>
                    ) : (
                      <>
                        {" "}
                        <p>Done</p> <FaCheck />
                      </>
                    )}{" "}
                  </button>
                  <h3 className="heading"> Problem:</h3>
                  {/* <hr className="border-t-bd"></hr> */}
                  <div className="flex flex-col gap-1">
                    <p className="mt-4 text-xl text-white">
                      Probem you want to solve:
                    </p>

                    <div className="w-full glass-box !bg-white/90">
                      {editProblem ? (
                        <TextareaAutosize
                          className="w-[95%] rounded-md"
                          defaultValue={contentPq1}
                          placeholder="..."
                          onChange={(e) => {
                            setContentPq1(e.target.value);
                            let updated = pFormRedux;
                      updated.pq1 = e.target.value;
                      dispatch(pFormAction(updated));
                            setChanges(true);
                          }}
                        ></TextareaAutosize>
                      ) : (
                        <p>{contentPq1}</p>
                      )}
                    </div>

                    <p className="mt-4 text-xl text-white">Potential Cause:</p>

                    <div className="w-full glass-box !bg-white/90">
                      {editProblem ? (
                        <TextareaAutosize
                          className="w-[95%] rounded-md"
                          defaultValue={contentPq2}
                          placeholder="..."
                          onChange={(e) => {
                            setContentPq2(e.target.value);
                            let updated = pFormRedux;
                      updated.pq2 = e.target.value;
                      dispatch(pFormAction(updated));
                            setChanges(true);
                          }}
                        ></TextareaAutosize>
                      ) : (
                        <p>{contentPq2}</p>
                      )}
                    </div>
                    <p className="mt-4 text-xl text-white">Root Cause:</p>

                    <div className="w-full glass-box !bg-white/90">
                      {editProblem ? (
                        <TextareaAutosize
                          className="w-[95%] rounded-md"
                          defaultValue={contentPq3}
                          placeholder="..."
                          onChange={(e) => {
                            setContentPq3(e.target.value);
                            let updated = pFormRedux;
                      updated.pq3 = e.target.value;
                      dispatch(pFormAction(updated));
                            setChanges(true);
                          }}
                        ></TextareaAutosize>
                      ) : (
                        <p>{contentPq3}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col">
              <div className="my-8 glass-box ">
                <p className="text-xl text-t-bd">
                  You&apos;ve come a long way! Now is when the real fun starts.
                  It&apos;s time to ideate. 💡
                </p>
              </div>
            </div>
            <div className="flex items-center justify-between w-full mb-8">
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
                  className="w-[16em] h-[4em] card__btn_next right-[50px] flex items-center justify-center md:hover:scale-105 md:transition-transform md:active:scale-95 fade-effect cursor-pointer shadow-t-bd/50 md:hover:shadow-xl m-1 drop-shadow-xl "
                  onClick={saveOrContinue}
                >
                  Continue to Solutions
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
