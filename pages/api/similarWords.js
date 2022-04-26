// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from "axios";


export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      console.log("req initiated!");
      // console.log(req.body.input);

      // let pexelsReq =  pexelsRequest(req)
      // .then((response) => {
      //   console.log(response);
      // })
      // // let pexelsReq = await pexelsRequest(req);
      console.log(req.body.input)
      let urlSafe = req.body.input.split(" ").join("+")
      var datamuseConfig = {
        method: "get",
        url: `https://api.datamuse.com/words?ml=${urlSafe}`,
        headers: {},
      };

     let search = await axios(datamuseConfig)
      .then(function (response) {
        // console.log("......NEW API Pexels request........");
        // console.log(response.data);
        let simWordsResults = response.data;
   
        res.status(200).json({ results: simWordsResults });
        console.log("req successful!");
    // return response;
  
      })
      .catch(function (error) {
        // console.log("-----FAILED Pexels request-------");
        console.log(error);
        res.status(200).json({ results: "error" });

      });



 
    } catch (err) {
      console.log("caught pexels api error");

      res.status(err).json({});
    }
  } else {
    // console.log("else 405");

    res.status(405);
    res.end();
  }
}

// export default handler;