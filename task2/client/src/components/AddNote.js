import React, { Component } from "react";
import { connect } from "react-redux";
import { addNote } from "../actions/noteActions";

class AddNote extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: ""
    };
  }

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onSubmit = e => {
    e.preventDefault();

    const newNote = {
      text: this.state.text
    };
    this.props.addNote(newNote);
  };

  render() {
    return (
      <form className="add-note" onSubmit={this.onSubmit} autoComplete="off">
        <div className="add-note__group">
          <label htmlFor="note" className="add-note__label">
            Add note
          </label>
          <input
            type="text"
            id="note"
            className="add-note__input"
            name="text"
            onChange={this.onChange}
            value={this.state.text}
          />
        </div>
        <button type="submit" className="add-note__button">
          Add
        </button>
      </form>
    );
  }
}

const mapStateToProps = state => ({
    note: state.note
})

export default connect(mapStateToProps, {addNote})(AddNote);
