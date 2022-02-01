import { React, useState } from "react";
import TextArea from "./TextArea";

function ProblemNote() {
  // const [rating, setRating] = useState(5);

  return (
    <div>
      <p> Problem Title</p>
      <TextArea rows="1" ph="Problem" />
      <p>Details</p>
      <TextArea rows="6" ph="Details" />

     
    </div>
  );
}

export default ProblemNote;
