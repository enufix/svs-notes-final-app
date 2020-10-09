import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from "prop-types";
import './NotesGrid.css';
import {Link} from 'react-router-dom'
import EditIcon from "@material-ui/icons/Edit";
import CloseIcon from "@material-ui/icons/Close";


export default class NotesGrid extends Component {
    state = {
        notes: []
    }

    componentDidMount() {
        axios.get('/api/notes')
            .then(response => {
                this.setState({
                    notes: response.data
                })
            })
    }

    render() {
        return (
            <div>
                {this.state.notes.map(note => <Note id = {note.id} title={note.title} content={note.content} tags={note.tags}>NotesGrid</Note>)}
            </div>
        );
    }
}

function Note(props) {

    return <div className="note">
        <NoteHeader title={props.title} id={props.id}/>
        <NoteContent content={props.content}/>
        <NoteFooter title={props.title} content={props.content} id={props.id} tags={props.tags}/>
    </div>;
}

Note.propTypes = {
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired
};

function NoteHeader({ title, id }) {
    const deleteNote = (id) => {
        axios.delete((`/api/notes/${id}`) )
            .then((res) => this.setState({ notes: this.state.notes.filter((note) => note.id !== id ) }) )
            .catch(err => console.log(err))
             window.location.reload(true)
    }
    return (
        <span className="note-header">
            {title}
            <button className="delete-note-button" onClick={() => deleteNote(id)}>
            <i className="material-icons"><CloseIcon/></i>
            </button>
        </span>
    );
}

NoteHeader.propTypes = {
    title: PropTypes.string.isRequired
};


function NoteContent({ content }) {
    return (
        <div className="note-content">
            {content}
        </div>
    );
}

NoteContent.propTypes = {
    content: PropTypes.string.isRequired
};

function NoteFooter({ tags, id }) {
    return (

        <div className="note-footer">
            <Link to={"/edit-note/" + id} >
                <button className="edit-note-button"><EditIcon/></button>
            </Link>
            {
                tags.map(tag => <Link to={"/tags/"+tag.id+"/notes"}> <span className="footer-tags" >#{tag.name}</span> </Link>)
            }
        </div>
    );
}

NoteFooter.propTypes = {
    tags: PropTypes.array.isRequired
};


export const Example = () => <NotesGrid />;