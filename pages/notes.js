import IdeaSideBar from "../components/Notes/IdeaSideBar";
import { useRouter } from "next/router";
import IdeaFeed from "../components/Notes/IdeaFeed";
import AuthCheck from "../components/Authentication/AuthCheck";
import Editor from "../components/Notes/Editor";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { firebaseAdmin } from "../lib/firebaseAdmin";
import nookies from "nookies";
import ProblemEditor from "../components/Notes/ProblemEditor";

export const getServerSideProps = async (ctx) => {
  try {
    const cookies = nookies.get(ctx);

    console.log(ctx)
    const token = await firebaseAdmin.auth().verifyIdToken(cookies.token);
    // console.log(token)

    // the user is authenticated!
    const { uid } = token;

    // FETCH STUFF HERE!! 🚀

    return {
      props: { cookieUID: uid },
    };
  } catch (err) {
    // either the `token` cookie didn't exist
    // or token verification failed
    // either way: redirect to the login page

    //TODO: add logic to redirect to login page if token is invalid, if that is needed. confirm uid exists on client side.
    // ctx.res.writeHead(302, { Location: '/login' });
    // ctx.res.end();



    console.log(err)
    
    // The props returned here don't matter because we've
    // already redirected the user.
    // return { props: { error: err } };
    return { props: {} };

  }
};

const NotePage = (props) => {
  const [currentNote, setCurrentNote] = useState("ideas");

  const unsavedChangesRedux = useSelector((state) => state.unsavedChanges);
  // const [ID, setID] = useState(null);
  // useEffect(() => {

console.log(currentNote)
 

  
  return (
    <div className="flex flex-col mt-3 fade-effect-quick">
      {/* <div className="flex flex-col items-center "> */}
      {/* <p>A place for all of your wild ideas and notes.</p> */}
      {/* </div> */}
      <div className="note-grid">
        <div className="note-grid-1 normal-box-soft h-full !rounded-2xl  min-w-[240px]">
          <IdeaSideBar cookieUID={props.cookieUID} type={currentNote} setCurrentNote={setCurrentNote}/>
        </div>

        <div className="mt-1 note-grid-2">
         {currentNote !== "problem"  && <Editor cookieUID={props.cookieUID} type={currentNote}/>} 
         {currentNote === "problem" && <ProblemEditor cookieUID={props.cookieUID} type={currentNote}/>} 
  
        </div>
      </div>
    </div>
  );
};

export default NotePage;
