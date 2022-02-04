import React from "react";
import { useState } from "react";
import axios from "axios";
import Timer from "../../components/MainPage/pomodoro";
// let key = process.env.NEXT_PUBLIC_TEST;
// console.log(key + "key");
// const axios = require("axios");



const ImplementationPage = (props) => {
  // console.log(props.test + "prop");
  const [content, setContent] = useState("");

  const fetchComments = async () => {
    const response = await fetch('/api/gptj')
    const data = await response.json()
    setComments(data)
  }

  const submitComment = async () => {
    const response = await fetch('/api/gptj', {
      method: 'POST',
      body: JSON.stringify({ content }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const data = await response.json()
    console.log(data)
  }


  return (
    <div className="implementation-page fade-effect-quick">
      <h1 className="heading-top">Implementation Page</h1>
      <input
          type='text'
          value={content}
          onChange={e => setContent(e.target.value)}
        />
        <button onClick={submitComment}>Submit comment</button>
        <button onClick={fetchComments}>Load comments</button>
        <Timer />
    </div>
)

}




export default ImplementationPage;
