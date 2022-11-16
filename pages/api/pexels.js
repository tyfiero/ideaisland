
import axios from "axios";


export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      console.log("req initiated!");
   
      let pexelsConfig = {
        method: "get",
        url: `https://api.pexels.com/v1/search?query=${req.body.input}&per_page=${"9"}&page=${req.body.page}`,
        headers: {
          Authorization: process.env.PEXELS_KEY,
        },
      };
     let search = await axios(pexelsConfig)
      .then(function (response) {
        console.log("......NEW API Pexels request........");
        let pexelsResults = response.data;
   
        res.status(200).json({ results: pexelsResults });
        console.log("req successful!");
  
      })
      .catch(function (error) {
        console.log("-----FAILED Pexels request-------");
        console.log(error);
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