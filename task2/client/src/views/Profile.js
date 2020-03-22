import React, { Component } from "react";
import NoteList from "../components/NoteList";
import AddNote from "../components/AddNote";
import store from "../store";
import {loadUser} from '../actions/authActions';

class Profile extends Component {
  componentDidMount() {
    store.dispatch(loadUser);
  }

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
