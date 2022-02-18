import React from "react";
// import { useState } from "react";
// import axios from "axios";
// let key = process.env.NEXT_PUBLIC_TEST;
// console.log(key + "key");
// const axios = require("axios");
import MusicPlayer from "../../components/Layout/MusicPlayer";

import AuthCheck from "../../components/Authentication/AuthCheck";
const ImplementationPage = (props) => {
  // console.log(props.test + "prop");



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
