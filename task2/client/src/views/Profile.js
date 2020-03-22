import React, { Component } from "react";
import NoteList from "../components/NoteList";
import AddNote from "../components/AddNote";
import { connect } from 'react-redux';
import {loadUser} from '../actions/authActions';

class Profile extends Component {
  componentDidMount() {
    this.props.loadUser();
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

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps, {loadUser})(Profile);
