import { React, useState } from "react";
import TextArea from "./TextArea";

function IdeaNote() {
  const [rating, setRating] = useState(5);

  return (
    <div>
      <p>Title</p>
      <TextArea rows="1" ph="Idea Title" />
      <p>Notes</p>
      <TextArea rows="5" ph="Idea Details" />
      <p>Rating</p>

      <div className="flex items-center justify-center">
        <div className="flex items-center mt-2 mb-4 cursor-pointer">
          <svg
            // className="w-4 h-4 mx-1 text-yellow-500 fill-current"
            className={
              rating >= 1
                ? "w-4 h-4 mx-1 text-yellow-500 fill-current"
                : "w-4 h-4 mx-1 text-gray-400  fill-current"
            }
            onClick={() => setRating(1)}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
          </svg>
          <svg
            // className="w-4 h-4 mx-1 text-yellow-500 fill-current"
            className={
              rating >= 2
                ? "w-4 h-4 mx-1 text-yellow-500 fill-current"
                : "w-4 h-4 mx-1 text-gray-400  fill-current"
            }
            onClick={() => setRating(2)}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
          </svg>
          <svg
            // className="w-4 h-4 mx-1 text-yellow-500 fill-current"
            className={
              rating >= 3
                ? "w-4 h-4 mx-1 text-yellow-500 fill-current"
                : "w-4 h-4 mx-1 text-gray-400  fill-current"
            }
            onClick={() => setRating(3)}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
          </svg>
          <svg
            // className="w-4 h-4 mx-1 text-yellow-500 fill-current"
            className={
              rating >= 4
                ? "w-4 h-4 mx-1 text-yellow-500 fill-current"
                : "w-4 h-4 mx-1 text-gray-400  fill-current"
            }
            onClick={() => setRating(4)}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
          </svg>
          <svg
            // className="w-4 h-4 mx-1 text-gray-400 fill-current"
            className={
              rating === 5
                ? "w-4 h-4 mx-1 text-yellow-500 fill-current"
                : "w-4 h-4 mx-1 text-gray-400  fill-current"
            }
            onClick={() => setRating(5)}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
          </svg>
        </div>
      </div>
    </div>
  );
}

export default IdeaNote;
