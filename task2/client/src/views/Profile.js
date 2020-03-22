import React, { Component } from "react";
import NoteList from "../components/NoteList";
import AddNote from "../components/AddNote";
import { connect } from "react-redux";
import { loadUser } from "../actions/authActions";
import "./Profile.css";

class Profile extends Component {
  componentDidMount() {
    this.props.loadUser();
  }

  render() {
    return (
      <div className="profile">
        <h2>Welcome, user!</h2>
        <div className="profile__wrapper">
          <div className="profile__item">
            <AddNote></AddNote>
          </div>
          <div className="profile__item">
            <NoteList></NoteList>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { loadUser })(Profile);
