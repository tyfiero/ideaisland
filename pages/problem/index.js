import AuthCheck from "../../components/Authentication/AuthCheck";
import ProblemWizard from "../../components/MainPage/problemComponents/ProblemWizard";
import ToolBar from "../../components/MainPage/problemComponents/ToolBar";

const ProblemPageIndex = (props) => {
  return (
    <>
        <ProblemWizard />
    </>
  );
};

export default ProblemPageIndex;

//Old server side props using cookies:
//export const getServerSideProps = async (ctx) => {
//   try {
//     const cookies = nookies.get(ctx);
//     const token = await firebaseAdmin.auth().verifyIdToken(cookies.token);

//     // the user is authenticated!
//     const { uid } = token;

//     // FETCH STUFF HERE!! 🚀

//     return {
//       props: { cookieUID: uid },
//     };
//   } catch (err) {
//     // either the `token` cookie didn't exist
//     // or token verification failed
//     // either way: redirect to the login page

//

//     // ctx.res.writeHead(302, { Location: '/login' });
//     // ctx.res.end();

//     // The props returned here don't matter because we've
//     // already redirected the user.
//     return { props: {} };
//   }
// };
