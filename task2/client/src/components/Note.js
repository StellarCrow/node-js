import React, { Component } from 'react';
import {connect} from 'react-redux';
import {deleteNote} from '../actions/noteActions';

class Note extends Component {
    constructor(props) {
        super(props);

        const {id, name, text, checked} = props.note;

        this.state = {
            id: id,
            name: name,
            text: text,
            checked: checked
        }
    }

    onDeleteClick = (id) => {
        this.props.deleteNote(id);
    }

    render() {
        return (
            <div className="note" id={this.state.id}>
                <div className="note__check">
                    <input type="checkbox" name={this.state.name} checked={this.state.checked}/>
                </div>
                <div className="note__text">{this.state.text}</div>
                <div className="note__options">
                    <button className="note__button note__button--delete" onClick={this.onDeleteClick.bind(this, this.state.id)}>Delete</button>
                    <button className="note__button note__button--modify">Modify</button>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => ({
    notes: state.note,
    note: ownProps.note
})

export default connect(mapStateToProps, { deleteNote })(Note);