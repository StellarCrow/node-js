import React, { Component } from "react";
import NoteList from "../components/NoteList";
import AddNote from "../components/AddNote";

class Profile extends Component {
  render() {
    return (
      <div className="profile">
        <h2>Welcome, user!</h2>
        <AddNote></AddNote>
        <NoteList></NoteList>
      </div>
    );
  }
}

export default Profile;
