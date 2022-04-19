// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from "axios";
// import { responseSymbol } from "next/dist/server/web/spec-compliant/fetch-event";

const OpenAI = require("openai-api");
const openai = new OpenAI(process.env.OPENAI_API_KEY);
// import gpt3APIRequest from "./gpt";

async function gpt3APIRequest(req) {
  //   console.log(req.body.input);
  // console.log(process.env.OPENAI_API_KEY);

  let userInput = req.body.input;

  //   let input = ` ${req}`;
  // let prompt = `Brainstorm some ideas combining ${userInput}: `;
  let prompt = ` ${userInput}: `;

  const gptResponse = await openai.complete({
    // engine: "ada",
    engine: 'davinci',
    prompt: prompt,
    maxTokens: 50,
    temperature: 0.7,
    topP: 1,
    presencePenalty: 1,
    frequencyPenalty: 0.5,
    stream: false,
    bestOf: 1,
    n: 1,
  });

  //   console.log(gptResponse.data.choices[0].text);

  return gptResponse.data.choices[0].text;
  //   res.status(200).json({ text: `${gptResponse.data.choices[0].text}` });
}

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      console.log("req initiated!");
      gpt3APIRequest(req);
      let gptRes = await gpt3APIRequest(req);
      res.status(200).json({ results: gptRes });
      console.log("req successful!");
    } catch (err) {
      console.log("caught gpt3 api error");

      res.status(err).json({});
    }
  } else {
    // console.log("else 405");

    res.status(405);
    res.end();
  }
}

// export default gpt3APIRequest;
