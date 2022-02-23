import React from "react";
import { useEffect } from "react";
import { useState } from "react";

export default function Stars({ rating, sendRating }) {
  const [stars, setStars] = useState(rating);
  const [hoverStars, setHoverStars] = useState();

//   console.log(hoverStars)
useEffect(()=>{
    setStars(rating);
},[rating])

  return (
    <div className="flex items-center justify-center">
      <div className="flex items-center cursor-pointer">
        <svg
          // className="w-4 h-4 mx-1 text-t-bl fill-current"
          className={
            stars >= 1 || hoverStars >=1
              ? "w-6 h-6 mx-1 text-t-bl fill-current md:hover:text-blues-200"
              : "w-6 h-6 mx-1 text-gray-400  fill-current md:hover:text-blues-200"
          }
          onMouseOver={() => setHoverStars(1)}
          onMouseOut={() => setHoverStars(0)}
          onClick={() => {
              if(stars === 1){
            sendRating(0);
                setStars(0);

              }else{
                sendRating(1);

                setStars(1);

              }
          }}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
        </svg>
        <svg
          // className="w-4 h-4 mx-1 text-t-bl fill-current"
          className={
            stars >= 2  || hoverStars >=2
              ? "w-6 h-6 mx-1 text-t-bl fill-current md:hover:text-blues-200"
              : "w-6 h-6 mx-1 text-gray-400  fill-current md:hover:text-t-bl"
          }
          onMouseOver={() => setHoverStars(2)}
          onMouseOut={() => setHoverStars(0)}
          onClick={() => {
            sendRating(2);

            setStars(2);
          }}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
        </svg>
        <svg
          // className="w-4 h-4 mx-1 text-t-bl fill-current"
          className={
            stars >= 3  || hoverStars >=3
              ? "w-6 h-6 mx-1 text-t-bl fill-current md:hover:text-blues-200"
              : "w-6 h-6 mx-1 text-gray-400  fill-current md:hover:text-t-bl"
          }
          onMouseOver={() => setHoverStars(3)}
          onMouseOut={() => setHoverStars(0)}
          onClick={() => {
            sendRating(3);

            setStars(3);
          }}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
        </svg>
        <svg
          // className="w-4 h-4 mx-1 text-t-bl fill-current"
          className={
            stars >= 4 || hoverStars >=4
              ? "w-6 h-6 mx-1 text-t-bl fill-current md:hover:text-blues-200"
              : "w-6 h-6 mx-1 text-gray-400  fill-current md:hover:text-t-bl"
          }
          onMouseOver={() => setHoverStars(4)}
          onMouseOut={() => setHoverStars(0)}
          onClick={() => {
            sendRating(4);

            setStars(4);
          }}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
        </svg>
        <svg
          // className="w-4 h-4 mx-1 text-gray-400 fill-current"
          className={
            stars === 5
              ? "w-6 h-6 first-letter:mx-1 text-t-bl fill-current md:hover:text-blues-200"
              : ("w-6 h-6 mx-1 text-gray-400  fill-current md:hover:text-t-bl")
          }
          onMouseOver={() => setHoverStars(5)}
        onMouseOut={() => setHoverStars(0)}
          onClick={() => {
            sendRating(5);

            setStars(5);
          }}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
        </svg>
      </div>
    </div>
  );
}
