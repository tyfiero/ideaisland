import IdeaSideBar from "../components/Notes/IdeaSideBar";
import { useRouter } from "next/router";
import IdeaFeed from "../components/Notes/IdeaFeed";
import AuthCheck from "../components/Authentication/AuthCheck";
import Editor from "../components/Notes/Editor";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { firebaseAdmin } from "../lib/firebaseAdmin";
import nookies from "nookies";

export const getServerSideProps = async (ctx) => {
  try {
    const cookies = nookies.get(ctx);
    const token = await firebaseAdmin.auth().verifyIdToken(cookies.token);

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
    // ctx.res.writeHead(302, { Location: '/login' });
    // ctx.res.end();
    // The props returned here don't matter because we've
    // already redirected the user.
    return { props: { error: err } };
  }
};

const NotePage = (props) => {
  const unsavedChangesRedux = useSelector((state) => state.unsavedChanges);
  // const [ID, setID] = useState(null);
  // useEffect(() => {
  console.log(props.error);
  //   if(unsavedChangesRedux){
  //     window.onbeforeunload = function (e) {
  //       var message = "Your confirmation message goes here.",
  //       e = e || window.event;
  //       // For IE and Firefox
  //       if (e) {
  //         e.returnValue = message;
  //       }

  //       // For Safari
  //       return message;
  //     };
  //   }
  // }, [])

  return (
    <div className="flex flex-col mt-3 fade-effect-quick">
      {/* <div className="flex flex-col items-center "> */}
      {/* <p>A place for all of your wild ideas and notes.</p> */}
      {/* </div> */}
      <div className="note-grid">
        <div className="note-grid-1 normal-box-soft h-full !rounded-2xl  min-w-[240px]">
          <IdeaSideBar cookieUID={props.cookieUID} />
        </div>

        <div className="mt-1 note-grid-2">
          <Editor cookieUID={props.cookieUID} />
        </div>
      </div>
    </div>
  );
};

export default NotePage;
