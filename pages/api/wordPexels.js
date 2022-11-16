
import axios from "axios";


export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      console.log("req initiated!");
      let pexelsConfig = {
        method: "get",
        url: `https://api.pexels.com/v1/search?query=${req.body.input}&per_page=1&page=${req.body.page}&orientation=landscape`,
        headers: {
          Authorization: process.env.PEXELS_KEY,
        },
      };
     let search = await axios(pexelsConfig)
      .then(function (response) {
        console.log("......NEW API Pexels request........");
        // console.log(response.data);
        let pexelsResults = response.data;
   
        res.status(200).json({ results: pexelsResults });
        console.log("req successful!");
    // return response;
  
      })
      .catch(function (error) {
        console.log("-----FAILED Pexels request-------");
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