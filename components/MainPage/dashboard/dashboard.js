import React from "react";
import { useEffect } from "react";
// import { auth } from "../../../lib/firebase";
import { useSelector, useDispatch } from "react-redux";
import PublicIdeaFeed from "../../PublicIdeaFeed";
import PieChart from "./PieChart";
import ChartIdeas from "./ChartIdeas";
import IdeaSideBar from "../../Notes/IdeaSideBar";
import statsAction from "../../../redux/actions";
// import statsAction
// export async function getServerSideProps(context) {
//   return {
//     props: {},
//   }
// }

const Dashboard = () => {
  const notesRedux = useSelector((state) => state.notes);
  const statsRedux = useSelector((state) => state.stats);
  const userNameRedux = useSelector((state) => state.userName);

  const dispatch = useDispatch();

  // console.log(auth.currentUser);

  return (
    <div className="overflow-auto fade-effect-quick">
      <div className="dash-title">
        <h1 className="heading-top">Dashboard</h1>
      </div>
      <div className="stat-holder">
        {/* <button onClick={()=>{ dispatch(statsAction(5))}}>inc</button> */}
        {/* <p>userName: {userNameRedux}</p> */}
        <div className="dash-stat">
          <h2 className="heading">Ideas</h2>
          <h2 className="text-[40px]">{statsRedux?.ideaNum || 10}</h2>
        </div>
        <div className="dash-stat !rounded-xl ">
          <h2 className="heading">Evolved Ideas</h2>
          <h2 className="text-[40px]">3</h2>
        </div>
        <div className="dash-stat">
          <h2 className="heading">Problems</h2>
          <h2 className="text-[40px]">2</h2>
        </div>
        <div className="dash-stat">
          <h2 className="heading">Implementations</h2>
          <h2 className="text-[40px]">10</h2>
        </div>
      </div>
      <p>Include buttons to quickly launch favorite tools from dahsboard and display recent notes. Maybe a hop back in to where you were last button too </p>

      <div className="dash-graph-holder">
        <div className="dash-graph ">
          {/* <img className="w-[35em] rounded-xl drop-shadow-2xl shadow-2xl" src="./dummygraph.png" alt="graph" /> */}
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
      </div>
      <div className="dash-graph-holder">
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
      </div>
      <div className="ml-14 dash-wrapper">
        <div className="w-[35em]">{/* <IdeaSideBar /> */}</div>
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
        <div className="dash-news">
          <h1 className="heading">News and tips</h1>
        </div>
        <div className="dash-community">
          <h1 className="heading">Community Ideas</h1>
        </div>
      </div>
      {/* <PublicIdeaFeed /> */}
    </div>
  );
};

export default Dashboard;
