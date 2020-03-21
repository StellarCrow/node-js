import React,  { Component } from "react";
import NoteList from "../components/NoteList";

class Profile extends Component {
    constructor(props) {
        super(props);

        this.state= {
            user: null,
            notes: []
        }
    }

    render() {
        return (
            <div className="profile">
              <h2>Welcome, user!</h2>
              <NoteList notes={this.state.notes}></NoteList>
            </div>
          );
    }
  
}

export default Profile;
