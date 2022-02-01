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
var pageNumCounter = 1;

function CardImage(props) {
  // console.log(".......Image RERENDERED.........");

  //pagenumber + state manangement stuff

  const [isPhoto, setIsPhoto] = React.useState(null);
  const [nextPhoto, setNextPhoto] = React.useState(pageNumCounter);
  const [wordChanged, setWordChanged] = React.useState(false);

  const [isPhotographer, setIsPhotographer] = React.useState(null);
  const [isPhotoPage, setIsPhotoPage] = React.useState(
    "https://www.pexels.com/"
  );
  // var lastWord;
  //run once use effect.
  useEffect(() => {
    // Run! Like go get some data from an API.
    // lastWord = isPhoto;
  }, []);

  useEffect(() => {
    setWordChanged(true);
    setNextPhoto(1);
  }, [props.word]);
  function imageClickHandler() {
    if (wordChanged) {
      pageNumCounter = 1;
      setWordChanged(false);
    }
    pageNumCounter++;
    setNextPhoto(pageNumCounter);
    // pexelsRequest();
  }

  //axios based Pexels get request, still need to integrate img url into card component

  // let pageNum =1;

  // };
  // }
  // console.log(nextPhoto);

  useEffect(() => {
    // if (props.word !== lastWord) {
    //   // pexelsRequest();
    //   console.log("CHANGED");
    //   setNextPhoto(1);
    // }

    let pexelsConfig = {
      method: "get",
      url: `https://api.pexels.com/v1/search?query=${props.word}&per_page=1&page=${nextPhoto}`,
      headers: {
        Authorization:
          "563492ad6f9170000100000126ead604de784e1684734bbc1a8b4138",
      },
    };

    // function pexelsRequest() {
    // const pexelsRequest = () => {
    axios(pexelsConfig)
      .then(function (response) {
        console.log("......NEW Pexels request........");

        // console.log(JSON.stringify(response.data));
        imageData = response.data.photos;
        imagURLParse = imageData[0];
        photoUrl = imagURLParse.src.medium;
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
      })
      .catch(function (error) {
        console.log("-----FAILED Pexels request-------");

        photoUrl = "/cryingpepe.png";

        setIsPhoto(photoUrl);
        if (error) {
          photoCreditStatement =
            "Ooops! We cant display a photo at the moment, photos are usually";
        }
        setIsPhoto(photoUrl);

        console.log(error);
        //READD THIS CONSOLE LOG ERROR LATER
        // console.log(error);
      });
    //photo attribution to be rendered
    photoCreditStatement = `Photo by ${isPhotographer}`;
  }, [props.word, nextPhoto]); // This will only run when one of those variables change
  // let imgSrc = `"${photoUrl}"`;
  // let imgSrc = String(photoUrl);

  if (!isPhoto) return null;

  return (
    <div className="image_body">
      <img
        src={isPhoto}
        alt=""
        className="card__image"
        onClick={imageClickHandler}
        placeholder="blur"
      />
      <p className="photo_credit">
        {photoCreditStatement} from{" "}
        <a className="pexels-link" href={isPhotoPage}>
          Pexels.
        </a>
      </p>
    </div>
  );
}

export default CardImage;
