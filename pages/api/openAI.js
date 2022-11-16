import axios from "axios";
var throttle = require('lodash.throttle');
const OpenAI = require("openai-api");
const openai = new OpenAI(process.env.OPENAI_API_KEY);
   
import rateLimit from "../../lib/ratelimit";

const limiter = rateLimit({
  interval: 60 * 1000, // 60 seconds
  uniqueTokenPerInterval: 500, // Max 500 users per second
})
async function gpt3APIRequest(req) {
  let user = req.body.user;
  let userInput = req.body.input;
  let type = req.body.type;
  let kind = req.body.kind;



  let prompt = ` Making a new software product about ${userInput} is complex, but worth it. Here is a list of software product ideas in the ${userInput} domain:`;

  let aiInput 
if(type === "plan"){
  // console.log("Kind is not null or undefined")
  if(kind ==="Risks"){  
     aiInput = `${userInput} Write me a numbered list of macro risks to my business.`;
  }else if(kind ==="Opportunities"){
    aiInput = `${userInput} Write me a numbered list of opportunities and competitive advantages of my business.`;
 }else if(kind ==="Elevator"){
  aiInput = `${userInput} Write an elevator pitch for my business.`;
}else if(kind ==="Slogan"){
  aiInput = `${userInput} Write me three creative, memorable slogans for my business.`;
}else if(kind ==="Names"){
  aiInput = `${userInput} Write a numbered list of creative names for my business.`;
}else if(kind ==="Vision"){
  aiInput = `${userInput} What is my vision for the future of my product?`;
}
}else{

  if(type === "expand"){
    aiInput = (userInput + " ")
  }else{
    aiInput = prompt
  }
}

 
console.log(aiInput)
console.log("^^input")

let presence_penalty = type === "expand" ? 1.5 : 1;
let frequency_penalty = type === "expand" ? 1.5 : 0.5;

  const gptResponse = await openai.complete({
    engine: "text-davinci-002",
    prompt: aiInput,
    maxTokens: 100,
    user: user,
    temperature: 0.89,
    topP: 1,
    presencePenalty: presence_penalty,
    frequencyPenalty: frequency_penalty,
    stream: false,
    bestOf: 1,
    n: 1,
  });


  return gptResponse.data.choices[0].text;

}

export default async function handler(req, res) {

  try {
    await limiter.check(res, 50, 'CACHE_TOKEN') // 50 requests per minute

  if (req.method === "POST") {
    try {
     

      console.log("req initiated!");
      let gptRes = await gpt3APIRequest(req);

      let cF = await checkInContentFilter(gptRes);

      // console.log(cF);
      
      if(Number(cF) !== 2 ){
        res.status(200).json({ results: gptRes });
        console.log("req successful!");
      }else{
        res.status(200).json({ results: "*The returned response was flagged as unsafe or profane by openAI. Please try again with a different input*" });
        console.log("req successful, but is flagged unsafe");
      }

     
    } catch (err) {
      console.log("gpt3 api error");
      console.log(err);


      res.status(err).json({});
    }
  } else {
    // console.log("else 405");

    res.status(405);
    res.end();
  }


} catch (err) {
  console.log("Rate limit exceeded");
  // console.log(err);


  // res.status(err).json({});
  res.status(429).json({ error: 'Rate limit exceeded' })

}



}



async function checkInContentFilter(message) {
  // from docs: https://beta.openai.com/docs/engines/content-filter
  const response = await openai.complete({
    engine: "content-filter-alpha",
    prompt: "<|endoftext|>" + message + "\n--\nLabel:",
    temperature: 0,
    max_tokens: 1,
    top_p: 0,
    logprobs: 10,
  });



  let outputLabel = response.data["choices"][0]["text"];

  //  This is the probability at which we evaluate that a "2" is likely real
  //  vs. should be discarded as a false positive
  const toxicThreshold = -0.355;

  if (outputLabel === "2") {
    // console.log("output label is 2!")
    //  If the model returns "2", return its confidence in 2 or other output-labels
    const logprobs = response.data["choices"][0]["logprobs"]["top_logprobs"][0];
    // console.log(logprobs["2"])
    // console.log(logprobs["2"] < toxicThreshold)


    // If the model is not sufficiently confident in "2",
    //  choose the most probable of "0" or "1"
    // Guaranteed to have a confidence for 2 since this was the selected token.
    if (logprobs["2"] < toxicThreshold) {
      const logprob_0 = logprobs["0"];
      const logprob_1 = logprobs["1"];
      // console.log("0 log below")
      // console.log(logprobs["0"])
      // console.log("1 log below")
      // console.log(logprobs["1"])
      //  If both "0" and "1" have probabilities, set the output label
      //  to whichever is most probable
      if (logprob_0 && logprob_1) {
        if (logprob_0 >= logprob_1) {
          outputLabel = "0";
        } else {
          outputLabel = "1";
        }
        //  If only one of them is found, set output label to that one
      } else if (logprob_0) {
        outputLabel = "0";
      } else if (logprob_1) {
        outputLabel = "1";
      }
    }
  }

  //  If neither "0" or "1" are available, stick with "2"
  //  by leaving output_label unchanged.

  //  if the most probable token is none of "0", "1", or "2"
  //  this should be set as unsafe
  if (["0", "1", "2"].includes(outputLabel)) {
    //it does include 0 1 or 2
  }else{
    outputLabel = "2";
  }

  return outputLabel;
}
