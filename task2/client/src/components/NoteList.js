import React, { Component } from "react";
import Note from "./Note";

export default class NoteList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      notes: props.notes
    };
  }

  render() {
    const { notes } = this.state;
    return (
      <ul className="notes-list">
          {notes.map(note => {
            return <li className="notes-list__item">
              <Note note={note}></Note>
            </li>
          })}
      </ul>
    );
  }
}
