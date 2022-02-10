import React from "react";
import { useEffect } from "react";

// import ReactQuill from "react-quill"; // ES6
// import TextArea from "../components/TextArea";
import { useSelector, useDispatch } from "react-redux";
// import "react-quill/dist/quill.snow.css"; // ES6
import PublicIdeaFeed from "../../PublicIdeaFeed";


var localNotes;
const Dashboard = () => {
  const notesRedux = useSelector((state) => state.notes);

  useEffect(() => {
    localNotes = localStorage.getItem("notes");

    // console.log("client");
  }, []);
  //   var localNotes = localStorage.getItem("notes");

  // const handleQuilChange = () => {
  //   console.log("TEXT EDITED");
  // };

  return (
    <div className="fade-effect-quick">
      <div className="dash-title">
        <h1 className="heading-top">Dashboard</h1>
      </div>
      <div className="ml-14 dash-wrapper">
        <div className="note-wrapper">
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
        </div>
        <div className="dash-news">
          <h1 className="heading">News and tips</h1>
        </div>
        <div className="dash-community">
          <h1 className="heading">Community Ideas</h1>
        </div>
      </div>
      <PublicIdeaFeed />
    </div>
  );
};

export default Dashboard;
