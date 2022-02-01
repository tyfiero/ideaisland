import { React, useState } from "react";
import TextArea from "./TextArea";

function NoteNote() {
//   const [rating, setRating] = useState(5);

  return (
    <div>
      {/* <p>Title</p>
      <TextArea rows="1" ph="Idea Title" /> */}
      <p>Notes</p>
      <TextArea rows="10" ph="Notes" />

     
    </div>
  );
}

export default NoteNote;
