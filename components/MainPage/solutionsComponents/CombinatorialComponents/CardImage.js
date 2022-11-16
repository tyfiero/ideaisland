import Image from "next/image";
import React, { useState, memo, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
const axios = require("axios");
//cardimage.js global variables
var imageData;
var imagURLParse;
var photoUrl;
var photographerDataParse;
var photographerData;
var photoCreditStatement;
var photoPage;

function CardImage(props) {
  const [isPhoto, setIsPhoto] = React.useState(null);
  const [nextPhoto, setNextPhoto] = React.useState(1);
  const [wordChanged, setWordChanged] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [photoCreditStatement, setPhotoCreditStatement] =
    React.useState("Photo ");
  const [isPhotographer, setIsPhotographer] = React.useState(null);
  const [isPhotoPage, setIsPhotoPage] = React.useState(
    "https://www.pexels.com/"
  );

  useEffect(() => {
    setWordChanged(true);
    setNextPhoto(1);
    getPhoto();
  }, [props.alt]); // eslint-disable-line react-hooks/exhaustive-deps

  function imageClickHandler() {
    if (wordChanged) {
      setNextPhoto(1);
      setWordChanged(false);
    }
    let next = nextPhoto + 1;
    setNextPhoto(next);
    getPhoto();
    // pexelsRequest();
  }

  const getPhoto = (data) => {
    setLoading(true);

    let urlSafe = props.alt.split(" ").join("-");

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
        if (response.data.results !== "error") {
          if (error) {
            setError(false);
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
          let statement = photogropherStatement ?? "Photo";
          setPhotoCreditStatement(statement);
          // console.log(imagURLParse);

          // console.log(photoUrl);

          photoPage = imageData[0].url;
          setIsPhotoPage(photoPage);
          setLoading(false);

          // console.log(isPhotoPage);
        } else {
          console.log("ERRORRRRR");
          console.log("-----FAILED Pexels request-------");
          setError(true);
          photoUrl = "/cryingpepe.png";

          setIsPhoto(photoUrl);
          // photoCreditStatement =
          //   "No image found or error";
          setIsPhoto(photoUrl);
        }
      })
      .catch(function (error) {
        console.log("-----FAILED Pexels request-------");
        setError(true);
        photoUrl = "/cryingpepe.png";

        setIsPhoto(photoUrl);
        console.log(error);
      });

    return (
      <div className="relative flex flex-col justify-between rounded-lg min-w-[8em] items-center fade-effect">
        <div
          className="relative image_body w-[12em] h-[8em] rounded-lg cursor-pointer md:hover:ring-2 ring-t-bl transition duration-300 md:active:scale-95"
          onClick={imageClickHandler}
        >
          {loading ? (
            <Skeleton className=" object-cover !leading-loose !rounded-xl w-[12em] h-[8em] !p-0" />
          ) : (
            <img
              src={isPhoto}
              alt=""
              className="object-cover rounded-xl card__image w-[12em] h-[8em] "
              onClick={imageClickHandler}
              placeholder="blur"
            />
          )}
        </div>
        {loading ? (
          error ? (
            <p className="photo_credit whitespace-nowrap">
              An error has occured
            </p>
          ) : (
            <p className="photo_credit whitespace-nowrap">Loading...</p>
          )
        ) : (
          <p className="photo_credit whitespace-nowrap ">
            {photoCreditStatement} {" from "}
            <a
              className="underline text-t-bl"
              href={isPhotoPage}
              target="_blank"
              rel="noreferrer"
            >
              Pexels.
            </a>
          </p>
        )}
      </div>
    );
  };
}
export default CardImage;
