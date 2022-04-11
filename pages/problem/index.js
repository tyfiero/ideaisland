
import ProblemWizard from "../../components/MainPage/problemComponents/ProblemWizard";
import ToolBar from "../../components/MainPage/problemComponents/ToolBar"

import { firebaseAdmin } from "../../lib/firebaseAdmin";
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

     //TODO: add logic to redirect to login page if token is invalid, if that is needed. confirm uid exists on client side.
     
    // ctx.res.writeHead(302, { Location: '/login' });
    // ctx.res.end();
    
    // The props returned here don't matter because we've
    // already redirected the user.
    return { props: {} };
  }
};

const ProblemPageIndex = (props) => {
  return <><ProblemWizard /></>;

};

export default ProblemPageIndex;
