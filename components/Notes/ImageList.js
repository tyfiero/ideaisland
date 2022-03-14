// import './ImageList.css';
import React from "react";
import Loader from "../Layout/Loader";
import ImageCard from "./ImageCard";

const ImageList = (props) => {
  // console.log(props.images)
  let imgObj = props.images;
  let images;


    images = imgObj.map((image) => {
      return (
        <ImageCard
          key={image.id}
          image={image}
          sendURL={props.sendURL}
          loading={props.loading}
        />
      );
    });
  

  return (
    <div className="flex flex-wrap justify-center m-2 mx-3 gap-x-2">
      {images}
      <Loader loading={props.loading} />
    </div>
  );
  // return null;
};

export default ImageList;
