import React, { Component } from "react";
import Header from "./Header.js";
import NotesList from "./NotesList.js";

class App extends Component {
  state = {
    notes: [
      {
        id: Date.now(),
        title: "",
        description: "",
        doesMatchSearch: true
      }
    ],
    searchText: ""
  };

  //Event handler used to update the state:
  addNote = () => {
    //Format to add a new note to app:
    const newNote = {
      id: Date.now(),
      title: "",
      description: "",
      doesMatchSearch: true
    };

    //Here we are taking the new note and appending it to the existing notes array:
    const newNotes = [newNote, ...this.state.notes];
    this.setState({ notes: newNotes });
  };

  //Event handler used to update the state of the title and description by
  //receiving these 3 values:
  onType = (editMeId, updatedKey, updatedValue) => {
    //editMeId == id of the note that is edited
    //updatedKey == title or description field
    //updatedValue == value of title or description
    //Map over all the notes in state and return them as-is and update
    //the updatedValue field when needed
    const updatedNotes = this.state.notes.map((note) => {
      if (note.id !== editMeId) {
        return note; //it hasn't changed so return as-is
      } else {
        if (updatedKey === "title") {
          note.title = updatedValue;
          return note;
        } else {
          note.description = updatedValue;
          return note;
        }
      }
    });

    //This new array overrides the current array in state:
    this.setState({ notes: updatedNotes });
  };

  onSearch = (text) => {
    const newSearchText = text.toLowerCase();

    const updatedNotes = this.state.notes.map((note) => {
      //Makes sure if someone had info in field and deleted it, the notes return on the screen:
      if (!newSearchText) {
        note.doesMatchSearch = true;
        return note;
      } else {
        const title = note.title.toLowerCase();
        const description = note.description.toLowerCase();
        const titleMatch = title.includes(newSearchText);
        const descriptionMatch = description.includes(newSearchText);
        if (titleMatch) {
          note.doesMatchSearch = true;
        } else if (descriptionMatch) {
          note.doesMatchSearch = true;
        } else {
          note.doesMatchSearch = false;
        }
        return note;
      }
    });
    this.setState({
      notes: updatedNotes,
      searchText: newSearchText
    });
  };

  removeNote = (noteId) => {
    //filter through notes array and returning the note back to updatedNote
    // only if the noteId doesn't match the one passed to us in this method:
    const updatedNotes = this.state.notes.filter((note) => note.id !== noteId);
    this.setState({ notes: updatedNotes });
  };

  //Save state to the browser's storage after each re-render:
  componentDidUpdate() {
    const stateString = JSON.stringify(this.state.notes);
    localStorage.setItem("setString", stateString);
  }

  //Pull and save value when UI is reopened:
  componentDidMount() {
    const stateString = localStorage.getItem("setString");
    if (stateString) {
      const savedState = JSON.parse(stateString);
      this.setState({ notes: savedState });
    }
  }

  render() {
    return (
      <div>
        <Header
          addNote={this.addNote}
          searchText={this.state.searchText}
          onSearch={this.onSearch}
        />
        <NotesList
          removeNote={this.removeNote}
          onType={this.onType}
          notes={this.state.notes}
        />
      </div>
    );
  }
}

export default App;
