import Image from "next/image";
import React, { useState, memo, useEffect } from "react";
// import axios from "axios";

// import { useSelector, useDispatch } from "react-redux";
// import { listNum, listChanged, wordAction, allLists } from "../actions";
// import { connect } from "react-redux";

//cardimage.js global variables
var imageData;
var imagURLParse;
var photoUrl;
var photographerDataParse;
var photographerData;
var photoCreditStatement;
var photoPage;

const axios = require("axios");

function CardImage(props) {
  // console.log(".......Image RERENDERED.........");

  //pagenumber + state manangement stuff

  const [isPhoto, setIsPhoto] = React.useState(null);
  const [nextPhoto, setNextPhoto] = React.useState(1);
  const [wordChanged, setWordChanged] = React.useState(false);

  const [isPhotographer, setIsPhotographer] = React.useState(null);
  const [isPhotoPage, setIsPhotoPage] = React.useState(
    "https://www.pexels.com/"
  );
  //run once use effect.


  useEffect(() => {
    setWordChanged(true);
    setNextPhoto(1);
    getPhoto()
  }, [props.alt]);
  
  function imageClickHandler() {
    if (wordChanged) {
       setNextPhoto(1);
      setWordChanged(false);
    }
    let next = nextPhoto+1;
   setNextPhoto(next);
   getPhoto()
    // pexelsRequest();
  }

  //axios based Pexels get request, still need to integrate img url into card component

  // let pageNum =1;

  // };
  // }
  // console.log(nextPhoto);

const getPhoto = (data) =>{
    // if (props.word !== lastWord) {
    //   // pexelsRequest();
    //   console.log("CHANGED");
    //   setNextPhoto(1);
    // }
    let urlSafe = props.alt.split(" ").join("-")

    axios({
      method: "POST",
      url: "/api/wordPexels",
      data: {
        input: urlSafe,
        page: nextPhoto,
      },
      // headers: headers,
    })
      .then((response) => {
        if(response.data.results !== "error"){
          // console.log(response.data.results);
          imageData = response.data.results.photos;
          imagURLParse = imageData[0];
          photoUrl = imagURLParse.src.small;
          //console.log(imageData);
          setIsPhoto(photoUrl);
  
          //photo attribution for pexels and photographer
          photographerDataParse = imageData[0];
          photographerData = photographerDataParse.photographer;
          //console.log(photographerData);
          setIsPhotographer(photographerData);
          // console.log(imagURLParse);
  
          // console.log(photoUrl);
  
          photoPage = imageData[0].url;
          setIsPhotoPage(photoPage);
          // console.log(isPhotoPage);
        }else{
          console.log("ERRORRRRR")
          console.log("-----FAILED Pexels request-------");

          photoUrl = "/cryingpepe.png";
  
          setIsPhoto(photoUrl);
            photoCreditStatement =
              "No image found or error";
          setIsPhoto(photoUrl);
        }
       
      })
      .catch(function (error) {
        console.log("-----FAILED Pexels request-------");

       

        console.log(error);
        //READD THIS CONSOLE LOG ERROR LATER
        // console.log(error);
      });
//photo attribution to be rendered
photoCreditStatement = `Photo by ${isPhotographer}`;

      
    // let pexelsConfig = {
    //   method: "get",
    //   url: `https://api.pexels.com/v1/search?query=${props.alt}&per_page=1&page=${nextPhoto}orientation=landscape`,
    //   headers: {
    //     Authorization:
    //       "563492ad6f9170000100000126ead604de784e1684734bbc1a8b4138",
    //   },
    // };

    // // function pexelsRequest() {
    // // const pexelsRequest = () => {
    // axios(pexelsConfig)
    //   .then(function (response) {
    //     console.log("......NEW Pexels request........");

    //     // console.log(JSON.stringify(response.data));
    //     imageData = response.data.photos;
    //     imagURLParse = imageData[0];
    //     photoUrl = imagURLParse.src.small;
    //     //console.log(imageData);
    //     setIsPhoto(photoUrl);

    //     //photo attribution for pexels and photographer
    //     photographerDataParse = imageData[0];
    //     photographerData = photographerDataParse.photographer;
    //     //console.log(photographerData);
    //     setIsPhotographer(photographerData);
    //     // console.log(imagURLParse);

    //     // console.log(photoUrl);

    //     photoPage = imageData[0].url;
    //     setIsPhotoPage(photoPage);
    //     // console.log(isPhotoPage);
    //   })
    //   .catch(function (error) {
    //     console.log("-----FAILED Pexels request-------");

    //     photoUrl = "/cryingpepe.png";

    //     setIsPhoto(photoUrl);
    //     if (error) {
    //       photoCreditStatement =
    //         "No image found or error";
    //     }
    //     setIsPhoto(photoUrl);

    //     console.log(error);
    //     //READD THIS CONSOLE LOG ERROR LATER
    //     // console.log(error);
    //   });
    
  }
   // This will only run when one of those variables change
  // let imgSrc = `"${photoUrl}"`;
  // let imgSrc = String(photoUrl);

  // if (!isPhoto) return null;

  return (
    <div className="relative flex flex-col justify-between rounded-lg min-w-[8em] items-center ">
     
       <div className="relative image_body w-[12em] h-[8em] rounded-lg cursor-pointer md:hover:ring-2 ring-t-bl transition duration-300 md:active:scale-95"
        onClick={imageClickHandler}
      
       >
          <img
        src={isPhoto}
        alt=""
        className="object-cover rounded-xl card__image w-[12em] h-[8em] "

        onClick={imageClickHandler}
        placeholder="blur"
      />
       {/* <Image
               layout="fill"
               className="rounded-xl card__image"
               
                  placeholder="blur"
                  blurDataURL="data:image/webp;base64,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"
                  src={isPhoto}
                  alt={props.alt}
                /> */}
                </div>
      <p className="photo_credit whitespace-nowrap">
        {photoCreditStatement} {" from "}
        <a className="text-t-bl" href={isPhotoPage}>
          Pexels.
        </a>
      </p>
    </div>
  );
}

export default CardImage;
