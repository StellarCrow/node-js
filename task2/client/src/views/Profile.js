import React,  { Component } from "react";
import NoteList from "../components/NoteList";
import {connect} from 'react-redux';
import {getNotes} from '../actions/noteActions';
import PropTypes from 'prop-types';

class Profile extends Component {
    constructor(props) {
        super(props);

        this.state= {
            user: null,
            notes: []
        }
    }

    componentDidMount() {
        this.props.getNotes();
    }

    render() {
        const { notes } = this.props.note
        return (
            <div className="profile">
              <h2>Welcome, user!</h2>
              <NoteList notes={notes}></NoteList>
            </div>
          );
    }
  
}

Profile.propTypes = {
    getNotes: PropTypes.func.isRequired,
    note: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    note: state.note
})

export default connect(mapStateToProps, { getNotes})(Profile);
