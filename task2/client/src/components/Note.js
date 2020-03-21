import React, { Component } from 'react'

export default class Note extends Component {
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
    render() {
        return (
            <div className="note" id={this.state.id}>
                <div className="note__check">
                    <input type="checkbox" name={this.state.name} checked={this.state.checked}/>
                </div>
                <div className="note__text">{this.state.text}</div>
                <div className="note__options">
                    <button className="note__button note__button--delete">Delete</button>
                    <button className="note__button note__button--modify">Modify</button>
                </div>
            </div>
        )
    }
}
