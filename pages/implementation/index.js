import React from "react";
// import { useState } from "react";
import { auth } from "../../lib/firebase";

// import axios from "axios";
// let key = process.env.NEXT_PUBLIC_TEST;
// console.log(key + "key");
// const axios = require("axios");
import MusicPlayer from "../../components/Layout/MusicPlayer";

import AuthCheck from "../../components/Authentication/AuthCheck";


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


const ImplementationPage = (props) => {



  return (
    <AuthCheck>
    <div className="implementation-page fade-effect-quick">
      <h1 className="heading-top">Implementation Page</h1>
   <MusicPlayer />
    </div>
    </AuthCheck>
)

}




export default ImplementationPage;
