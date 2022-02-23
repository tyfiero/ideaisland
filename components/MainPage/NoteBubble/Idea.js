import { React, useState } from "react";
import Stars from "../../Notes/Stars";
import TextArea from "./TextArea";
function IdeaNote() {

  return (
    <div>
      <p>Title</p>
      <TextArea rows="1" ph="Idea Title" />
      <p>Notes</p>
      <TextArea rows="5" ph="Idea Details" />
      <p>Rating</p>
    <Stars />      
      </div>
  );
}

export default IdeaNote;
