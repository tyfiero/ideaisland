// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from "axios";
// import { responseSymbol } from "next/dist/server/web/spec-compliant/fetch-event";

// console.log(process.env.NEXT_PUBLIC_OPENAI_API_KEY);
async function gptJAPIRequest(req) {
  //   console.log(req.body.input);

  let userInput = req.body.input;
  let prompt = `Write me a product idea that involves ${userInput}`;
  let promptToSend = { prompt: prompt };
  let config = {
    method: "POST",
    // "Access-Control-Allow-Origin" : *,
    url: "https://api.textsynth.com/v1/engines/gptj_6B/completions",
    // url: "/api/cors?url=https://api.textsynth.com/v1/engines/gptj_6B/completions",
    headers: {
      Authorization: process.env.GPTJ_API_KEY,
      // "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    },
    data: promptToSend,
  };

  let axiosRequest = await axios(config)
    //   axios(config)
    .then(function (response) {
      //   console.log(axiosRequest);
      //   console.log("res" + JSON.stringify(response.data));

      let gptjResponse = response.data.text;
    //   console.log("data.text" + gptjResponse);
      // dispatch(gptJOutputAction(gptjResponse));

      return gptjResponse;
    })
    .catch(function (error) {
      console.log("OH NO ERROR!");

      console.log(error);
    });
  return axiosRequest;
}
//   console.log(gptResponse.data.choices[0].text);

//   return gptResponse.data.choices[0].text;
//   res.status(200).json({ text: `${gptResponse.data.choices[0].text}` });
// }

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      console.log("req initiated!");
      //   gptJAPIRequest(req);
      let gptRes = await gptJAPIRequest(req);
      //   console.log("1+" + gptRes);
      if (gptRes !== undefined) {
        res.status(200).json({ results: gptRes });
      }
      //   console.log("req successful!");
    } catch (err) {
      console.log("caught gptJ api error");

      res.status(err).json({});
    }
  } else {
    // console.log("else 405");

    res.status(405);
    res.end();
  }
}

// export default gpt3APIRequest;

// OLD GPTJ

// useEffect(() => {
//     if (GPTJStatus) {
//       const jFunc = () => {
//         console.log("redux input" + gptJInputRedux);
//         var data = JSON.stringify({
//           prompt: `${gptJInputRedux}:`,
//         });

//         //MUST BE UPDATED. THIS WILL NOT WORK IN PRODUCTION!!!!!
//         var config = {
//           method: "post",
//           // url: "https://cors-anywhere.herokuapp.com/https://api.textsynth.com/v1/engines/gptj_6B/completions",
//           // "Access-Control-Allow-Origin" : *,
//           url: "https://api.textsynth.com/v1/engines/gptj_6B/completions",
//           // url: "/api/cors?url=https://api.textsynth.com/v1/engines/gptj_6B/completions",

//           headers: {
//             Authorization: process.env.NEXT_PUBLIC__GPTJ_API_KEY,

//             "Content-Type": "application/json",
//           },
//           data: data,
//         };

//         axios(config)
//           .then(function (response) {
//             console.log(JSON.stringify(response.data));
//             let gptjResponse = response.data.text;
//             // console.log(gptjResponse);
//             dispatch(gptJOutputAction(gptjResponse));
//           })
//           .catch(function (error) {
//             console.log(error);
//           });
//       };
//       jFunc();
//       setGPTJStatus(false);
//     }
//   }, [GPTJStatus]);
