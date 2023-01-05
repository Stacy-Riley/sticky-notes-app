import React from "react";
import Note from "./Note.js";

const NotesList = (props) => {
  //Callback function for filter method: if true it will add note to the filtered array
  const keepSearchMatches = (note) => note.doesMatchSearch === true;
  //Filter method used to capture all the good notes in the array:
  const searchMatches = props.notes.filter(keepSearchMatches);
  //
  //
  //Callback function - render a note component and pass it a note prop
  //each note will get a note object as written note = {note}
  //each note will pull from onType to edit notes
  const renderNote = (note) => (
    <Note
      removeNote={props.removeNote}
      onType={props.onType}
      note={note}
      key={note.id}
    />
  );
  //To filter over entire array: const noteElements = props.notes.map(renderNote);
  //It has been updated to now just filter over the searchMatches array
  const noteElements = searchMatches.map(renderNote);
  return <ul className="notes-list">{noteElements}</ul>;
};

export default NotesList;
