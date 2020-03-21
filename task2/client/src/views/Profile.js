import React,  { Component } from "react";
import NoteList from "../components/NoteList";

class Profile extends Component {

    render() {
        return (
            <div className="profile">
              <h2>Welcome, user!</h2>
              <NoteList></NoteList>
            </div>
          );
    }
  
}



export default Profile;
