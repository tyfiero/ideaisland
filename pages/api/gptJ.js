import axios from "axios";
import sanitize from "../../lib/sanitize";

async function gptJAPIRequest(req) {
    console.log(req.body);

  let userInput = sanitize(req.body.input, {
    USE_PROFILES: { html: true },
  });
  let prompt = `Making a new software product about ${userInput} is complex, but worth it! Here is a list of software product ideas in the ${userInput} domain`;

  let aIInput = req.body.type === "expand" ? (req.body.input + " ") : prompt;
  console.log(aIInput);

  let promptToSend = {
    prompt: aIInput,
    max_tokens: 100,
    temperature: 0.89,
    top_k: 40,
    top_p: 0.9,
    stop: null,
  };
  let config = {
    method: "POST",
    url: "https://api.textsynth.com/v1/engines/gptj_6B/completions",
   
    headers: {
      Authorization: process.env.GPTJ_API_KEY,
      // "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    },
    data: promptToSend,
  };

  let axiosRequest = await axios(config)
    .then(function (response) {
      let gptjResponse = response.data.text;
      return gptjResponse;
    })
    .catch(function (error) {
      console.log("OH NO ERROR!");

      console.log(error);
    });
  return axiosRequest;
}


export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      console.log("req initiated!");
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
