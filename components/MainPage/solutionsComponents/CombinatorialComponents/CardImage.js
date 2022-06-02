import Image from "next/image";
import React, { useState, memo, useEffect } from "react";
// import axios from "axios";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
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
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [photoCreditStatement, setPhotoCreditStatement] = React.useState("Photo ");

  


  const [isPhotographer, setIsPhotographer] = React.useState(null);
  const [isPhotoPage, setIsPhotoPage] = React.useState(
    "https://www.pexels.com/"
  );
  //run once use effect.


  useEffect(() => {
    setWordChanged(true);
    setNextPhoto(1);
    getPhoto()
  }, [props.alt]); // eslint-disable-line react-hooks/exhaustive-deps
  
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
  setLoading(true)
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
          if(error){
setError(false)
          }

          // console.log(response.data.results);
          imageData = response.data.results.photos;
          imagURLParse = imageData[0];
          photoUrl = imagURLParse.src.small;
          //console.log(imageData);
          setIsPhoto(photoUrl);
  
          //photo attribution for pexels and photographer
          photographerDataParse = imageData[0];
          photographerData = photographerDataParse.photographer;
          let photogropherStatement = "Photo by " + photographerData;
          //console.log(photographerData);
          setIsPhotographer(photographerData);
          let statement = photogropherStatement?? "Photo" 
          setPhotoCreditStatement(statement)
          // console.log(imagURLParse);
  
          // console.log(photoUrl);
  
          photoPage = imageData[0].url;
          setIsPhotoPage(photoPage);
  setLoading(false)
          
          // console.log(isPhotoPage);
        }else{
          console.log("ERRORRRRR")
          console.log("-----FAILED Pexels request-------");
setError(true)
          photoUrl = "/cryingpepe.png";
  
          setIsPhoto(photoUrl);
            // photoCreditStatement =
            //   "No image found or error";
          setIsPhoto(photoUrl);
        }
       
      })
      .catch(function (error) {
        console.log("-----FAILED Pexels request-------");
        setError(true)
        photoUrl = "/cryingpepe.png";
  
        setIsPhoto(photoUrl);
        console.log(error);
        //READD THIS CONSOLE LOG ERROR LATER
        // console.log(error);
      });
//photo attribution to be rendered
// photoCreditStatement = (isPhotographer === null ? "Photo" : `Photo by ${isPhotographer}`);

      
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
    <div className="relative flex flex-col justify-between rounded-lg min-w-[8em] items-center fade-effect">
     
       <div className="relative image_body w-[12em] h-[8em] rounded-lg cursor-pointer md:hover:ring-2 ring-t-bl transition duration-300 md:active:scale-95"
        onClick={imageClickHandler}
      
       >
      {loading ? <Skeleton className=" object-cover !leading-loose !rounded-xl w-[12em] h-[8em] !p-0" />: <img
        src={isPhoto}
        alt=""
        className="object-cover rounded-xl card__image w-[12em] h-[8em] "

        onClick={imageClickHandler}
        placeholder="blur"
      />}   
         
       
                </div>
    {loading ? (error ? <p className="photo_credit whitespace-nowrap">
    An error has occured
        
      </p> : <p className="photo_credit whitespace-nowrap">
      Loading...   
        
      </p>) : <p className="photo_credit whitespace-nowrap ">
        {photoCreditStatement} {" from "}
        <a className="underline text-t-bl" href={isPhotoPage} target="_blank" rel="noreferrer" >
          Pexels.
        </a>
      </p>}  
    </div>
  );
}

export default CardImage;
