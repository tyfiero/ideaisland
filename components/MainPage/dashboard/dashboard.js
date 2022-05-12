import React from "react";
import { useEffect } from "react";
// import { auth } from "../../../lib/firebase";
import { useSelector, useDispatch } from "react-redux";
import PublicIdeaFeed from "../../PublicIdeaFeed";
import PieChart from "./PieChart";
import ChartIdeas from "./ChartIdeas";
import IdeaSideBar from "../../Notes/IdeaSideBar";
import statsAction from "../../../redux/actions";
import FullLoader from "../../Layout/FullLoader";
import AuthCheck from "../../Authentication/AuthCheck";
import ReusableModal from "../../Layout/ReusableModal";
// import statsAction
// export async function getServerSideProps(context) {
//   return {
//     props: {},
import dynamic from "next/dynamic";
import IdeaFeed from "../../Notes/IdeaFeed";
import IdeasList from "../../Notes/IdeasList";
import { FaExternalLinkAlt } from "react-icons/fa";
import { useRouter } from "next/router";
import CircleTimer from "../../Layout/Timer";
const Quote = require('inspirational-quotes');

//   }
// }
const Streak = dynamic(() => import("./Streak"), { ssr: false });
const Dashboard = () => {
  const notesRedux = useSelector((state) => state.notes);
  const statsRedux = useSelector((state) => state.stats);
  const userNameRedux = useSelector((state) => state.userName);
  const router = useRouter();
  const dispatch = useDispatch();

  const [modalOpen, setModalOpen] = React.useState(false);
  // console.log(auth.currentUser);

  return (
    <AuthCheck>
      <div className="overflow-auto fade-effect-quick">
        {/* {modalOpen &&   <ReusableModal modalOpen={modalOpen} setModalOpen={setModalOpen} header="Test Header">  
      <p>Does this work?</p>
      <img src="ii-palm.png" alt="" />
    </ReusableModal>}

<button className="p-2 text-white bg-t-bl rounded-xl" onClick={()=>{setModalOpen(!modalOpen)}}>Open modal</button> */}

        <div className="dash-title">
          <h1 className="text-3xl text-t-bd dark:text-blues-100">Dashboard</h1>
        </div>
        <div className="stat-holder dark:bg-red">
          {/* <button onClick={()=>{ dispatch(statsAction(5))}}>inc</button> */}
          {/* <p>userName: {userNameRedux}</p> */}
          <div className="dash-stat">
            <h2 className="heading text-t-bd dark:text-blues-100">Ideas</h2>
            <h2 className="text-[40px]">{statsRedux?.ideaNum || 10}</h2>
          </div>
          <div className="dash-stat">
            <h2 className="heading text-t-bd dark:text-blues-100">
              Login Streak
            </h2>
            <Streak />
          </div>
          {/* <div className="dash-stat !rounded-xl ">
            <h2 className="heading text-t-bd dark:text-blues-100">
              Evolved Ideas
            </h2>
            <h2 className="text-[40px]">3</h2>
          </div> */}
          <div className="dash-stat">
            <h2 className="heading text-t-bd dark:text-blues-100">Problems</h2>
            <h2 className="text-[40px]">2</h2>
          </div>
          {/* <div className="dash-stat">
            <h2 className="heading text-t-bd dark:text-blues-100">
              Implementations
            </h2>
            <h2 className="text-[40px]">10</h2>
          </div> */}
        </div>
{/* <CircleTimer /> */}
    
        <div className="flex flex-col items-center p-3 h-30 normal-box">
        <p className="text-xl">Question of the Week</p>
          <h1 className="text-2xl dark:text-blues-100">
            How could you make an existing offering more accessible to another
            community?
          </h1>
        </div>
        <div className="flex flex-col items-center p-3 h-30 normal-box">
        <p className="text-xl">Inspirational Quotes</p>
          <h1 className="text-2xl dark:text-blues-100">
           {Quote.getQuote()?.text}
          </h1>
          <p>
          - {Quote.getQuote()?.author}
          </p>
        </div>
        {/* <p>
        Include buttons to quickly launch favorite tools from dahsboard and
        display recent notes. Maybe a hop back in to where you were last button
        too{" "}
      </p> */}

        <div className="flex items-center justify-center w-full gap-5 md:mx-0 md:my-5 sm:my-10">
          <div className="flex gap-5 md:flex-row sm:flex-col">
            <div className="w-[25em]  bg-clear-bl2 rounded-xl flex flex-col items-center py-4">
              <h2 className="heading text-t-bd dark:text-blues-100">
                Recent Ideas
              </h2>

              <IdeasList type="ideas" searchValue="" mode="dash" />

              <div className="relative mt-2 group">
                <div className="absolute transition duration-1000 rounded-full opacity-25 -inset-1 bg-gradient-to-r from-t-pl via-t-bl to-t-bpop blur-sm group-hover:opacity-100 group-hover:duration-200 animate-gradient-xy"></div>
                {/* <div className="relative flex justify-start rounded-lg ring-1 items-top"> */}

                <button
                  // type="submit"
                  // disabled={!isValid}
                  onClick={() => {
                    // dispatch(editModeAction("new"));
                    router.push("/notes");
                    // dispatch(currentDocAction(idea.identifier))
                  }}
                  className=" w-[12em] h-[2em] m-2 rounded-3xl bg-t-bl flex items-center justify-center text-slate-100 gap-4 drop-shadow-xl md:hover:scale-105 md:transition-transform md:active:scale-95 cursor-pointer md:hover:shadow-xl shadow-clear-bd3 step-2"
                >
                  <FaExternalLinkAlt className="text-[20px]" />
                  <p className="text-white">View All Ideas</p>
                </button>
              </div>
            </div>

            <div className="w-[25em]  bg-clear-pl3 rounded-xl flex flex-col items-center py-4">
              <h2 className="heading text-t-pd dark:text-pinks-100">
                Recent Problems
              </h2>

              <IdeasList type="problem" searchValue="" mode="dash" />

              <div className="relative mt-2 group">
                <div className="absolute transition duration-1000 rounded-full opacity-25 -inset-1 bg-gradient-to-r from-t-pl via-t-pm to-t-pd blur-sm group-hover:opacity-100 group-hover:duration-200 animate-gradient-xy"></div>
                {/* <div className="relative flex justify-start rounded-lg ring-1 items-top"> */}

                <button
                  // type="submit"
                  // disabled={!isValid}
                  onClick={() => {
                    // dispatch(editModeAction("new"));
                    router.push("/notes");
                    // dispatch(currentDocAction(idea.identifier))
                  }}
                  className=" w-[12em] h-[2em] m-2 rounded-3xl bg-t-pm flex items-center justify-center text-slate-100 gap-4 drop-shadow-xl md:hover:scale-105 transition md:active:scale-95 cursor-pointer md:hover:shadow-xl shadow-clear-bd3 step-2"
                >
                  <FaExternalLinkAlt className="text-[20px]" />
                  <p className="text-white">View All Problems</p>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* <div className="dash-graph-holder ">
          <div className="dash-graph ">
  
            <ChartIdeas />
          </div>

          <div className="graph-stats-holder ml-[6em]">
            <div className="graph-stat">
              <p>Ideas per day</p>
              <h4 className="graph-stat-num">0.43</h4>
            </div>
            <div className="graph-stat">
              <p>Problems per day</p>
              <h4 className="graph-stat-num">0.15</h4>
            </div>

            <div className="graph-stat">
              <p>Average problem to solution time</p>
              <h4 className="graph-stat-num">1h 8m</h4>
            </div>
            <div className="graph-stat">
              <p>Percentile Rank</p>
              <h4 className="graph-stat-num">93%</h4>
            </div>
          </div>
        </div> */}
        {/* <div className="dash-graph-holder">
        <div className="graph-stats-holder ml-[3em] mr-[6em]">
          <div className="graph-stat">
            <p>⭐⭐⭐⭐⭐</p>
            <h4 className="graph-stat-num">2</h4>
          </div>
          <div className="graph-stat">
            <p>⭐⭐⭐⭐</p>
            <h4 className="graph-stat-num">5</h4>
          </div>
          <div className="graph-stat">
            <p>⭐⭐⭐</p>
            <h4 className="graph-stat-num">7</h4>
          </div>
          <div className="graph-stat">
            <p>⭐⭐</p>
            <h4 className="graph-stat-num">12</h4>
          </div>
          <div className="graph-stat">
            <p>⭐</p>
            <h4 className="graph-stat-num">18</h4>
          </div>
        </div>
        <div className="dash-graph">
          <PieChart />
        </div>
      </div> */}
        {/* <div className="ml-14 dash-wrapper">
        <div className="w-[35em]"><IdeaSideBar /></div> */}
        {/* <divv className="note-wrapper">
          <div className="dash-notes">
            <h1 className="heading">My Notes</h1>

            <div className="dash-problems">
              <h1 className="heading2">My Problems</h1>
              <ol>
                <li className="dash-problems-list-item">
                  Ideas are hard to make
                </li>
                <li className="dash-problems-list-item">
                  Existing idea tools suck
                </li>
              </ol>
            </div>
            <div className="dash-ideas">
              <h1 className="heading2">My Ideas</h1>
              <li className="dash-ideas-list-item">Awesome App Idea</li>
              <li className="dash-ideas-list-item">Awesome App Idea</li>
              <li className="dash-ideas-list-item">Awesome App Idea</li>
            </div>
            <div className="dash-problems">
              <h1 className="heading2">Other Notes</h1>
              <p>{localNotes}</p>
            </div>
          </div>
        </divv> */}
        {/* <div className="dash-news">
          <h1 className="heading">News and tips</h1>
        </div>
        <div className="dash-community">
          <h1 className="heading">Community Ideas</h1>
        </div>
      </div> */}
        {/* <PublicIdeaFeed /> */}
      </div>
    </AuthCheck>
  );
};

export default Dashboard;
