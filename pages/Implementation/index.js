import React from "react";
// import { useState } from "react";
// import axios from "axios";
import Timer from "../../components/MainPage/pomodoro";
// let key = process.env.NEXT_PUBLIC_TEST;
// console.log(key + "key");
// const axios = require("axios");



const ImplementationPage = (props) => {
  // console.log(props.test + "prop");



  return (
    <div className="implementation-page fade-effect-quick">
      <h1 className="heading-top">Implementation Page</h1>
   
        <Timer />
    </div>
)

}




export default ImplementationPage;
