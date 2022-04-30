// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from "axios";
// import { responseSymbol } from "next/dist/server/web/spec-compliant/fetch-event";
// import sanitize from "../../lib/sanitize";

// console.log(process.env.NEXT_PUBLIC_OPENAI_API_KEY);
// async function pexelsRequest(req) {
//   //   console.log(req.body.input);
// // console.log(req);

//   let pexelsConfig = {
//     method: "get",
//     url: `https://api.pexels.com/v1/search?query=${"monstera"}&per_page=${"9"}&page=1`,
//     headers: {
//       Authorization:
//         "563492ad6f9170000100000126ead604de784e1684734bbc1a8b4138",
//     },
//   };
  
// let images, photoCredit;
// console.log(pexelsConfig);
//   axios(pexelsConfig)
//     .then(function (response) {
//       console.log("......NEW API Pexels request........");
//       // console.log(response);
 
//       // console.log(JSON.stringify(response.data));
//     //  let imageData = response.data.photos;
//     //   let  imagURLParse = imageData[0];
//     //   let photoUrl = imagURLParse.src.medium;
//     //   let photographerData = imagURLParse.photographer;

//       //console.log(imageData);
//       // setIsPhoto(photoUrl);
  
//       //photo attribution for pexels and photographer
//     //  let photographerDataParse = imageData[0];
//       //console.log(photographerData);
//       // setIsPhotographer(photographerData);
//       // console.log(imagURLParse);
  
//       // console.log(photoUrl);


//       // let photoCreditStatement = `by ${photographerData}`;
  
//       // photoPage = imageData[0].url;
//       // setIsPhotoPage(photoPage);
//       // console.log(isPhotoPage);

//   return response;

//     })
//     .catch(function (error) {
//       console.log("-----FAILED Pexels request-------");
  
  
//       // setIsPhoto(photoUrl);
//       if (error) {
//      let photoUrl = "/cryingpepe.png";
//       let photoCreditStatement =
//           "Ooops! We cant display a photo at the moment";
//       }
//       // setIsPhoto(photoUrl);
  
//       console.log(error);
//       //READD THIS CONSOLE LOG ERROR LATER
//       // console.log(error);
//     });

  // let results = [[images], [photoCredit]]
  // return results;

// }

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
        // console.log(response.data);
        let pexelsResults = response.data;
   
        res.status(200).json({ results: pexelsResults });
        console.log("req successful!");
    // return response;
  
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