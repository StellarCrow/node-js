import React, { Component } from "react";
import { connect } from "react-redux";
import {
  deleteNote,
  changeNoteText,
  changeNoteChecked
} from "../actions/noteActions";

class Note extends Component {
  constructor(props) {
    super(props);

    const { id, name, text, checked } = props.note;

    this.state = {
      id: id,
      name: name,
      text: text,
      checked: checked
    };
  }

  onModifyClick = id => {
    const text = this.state.text;
    this.props.changeNoteText(id, text);
  };

  onChangedCheckedHandler = e => {
    this.setState(
      {
        [e.target.name]: e.target.checked
      },
      function() {
        const id = this.state.id;
        const checked = this.state.checked;
        this.props.changeNoteChecked(id, checked);
      }
    );
  };

  onDeleteClick = id => {
    this.props.deleteNote(id);
  };

  inputChangedHandler = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  render() {
    return (
      <div className="note" id={this.state.id}>
        <div className="note__check">
          <input
            type="checkbox"
            name="checked"
            defaultChecked={this.state.checked}
            onChange={this.onChangedCheckedHandler}
          />
        </div>
        <div>
          <input
            type="text"
            className="note__text"
            name="text"
            defaultValue={this.state.text}
            onChange={this.inputChangedHandler}
          />
        </div>
        <div className="note__options">
          <button
            className="note__button note__button--delete"
            onClick={this.onDeleteClick.bind(this, this.state.id)}
          >
            Delete
          </button>
          <button
            className="note__button note__button--modify"
            onClick={this.onModifyClick.bind(this, this.state.id)}
          >
            Modify
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  notes: state.note,
  note: ownProps.note
});

export default connect(mapStateToProps, {
  deleteNote,
  changeNoteText,
  changeNoteChecked
})(Note);
