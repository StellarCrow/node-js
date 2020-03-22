import React, { Component } from "react";
import Note from "./Note";
import { connect } from "react-redux";
import { getNotes } from "../actions/noteActions";
import PropTypes from "prop-types";
import "./NoteList.css";

class NoteList extends Component {

  componentDidMount() {
    this.props.getNotes();
  }

  render() {
    const { notes } = this.props.note;
    
    return (
      <ul className="notes-list">
        {notes.map(note => {
          return (
            <li className="notes-list__item" key={note.id}>
              <Note note={note}></Note>
            </li>
          );
        })}
      </ul>
    );
  }
}

NoteList.propTypes = {
  getNotes: PropTypes.func.isRequired,
  note: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  note: state.note
})


export default connect(mapStateToProps, { getNotes})(NoteList)