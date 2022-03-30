import SolutionsPage from "../../components/MainPage/solutionsComponents/SolutionsPage";
import SolutionWizard from "../../components/MainPage/solutionsComponents/SolutionWizard";

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
    ctx.res.writeHead(302, { Location: '/login' });
    ctx.res.end();
    // The props returned here don't matter because we've
    // already redirected the user.
    return { props: {} };
  }
};

const SolutionsPageIndex = (props) => {
  // return <SolutionsPage />;
  return (
    <div className="TBD-container fade-effect">
        <SolutionWizard cookieUID={props.cookieUID}/>
    </div>
  );
};

export default SolutionsPageIndex;
