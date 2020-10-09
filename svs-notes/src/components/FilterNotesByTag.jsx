import React, {Component} from "react";
import axios from 'axios';
import { Link } from "react-router-dom";
import {Note} from "@material-ui/icons";
import './FilterNoteByTag.css';


export default class FilterNotesByTag extends Component{
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.match.params.id,
            notes: []
        }
    }

    componentDidMount() {
        axios.get(`/api/tags/${this.state.id}/notes`)
            .then((res) => {
                this.setState({notes: res.data})
            })
    }

    render(){
        return(
            <div className="note">
                <div className="cancel-filter">
                    <Link to='/'>
                        <button className='cancel-filter-button'>Cancel Filter</button>
                    </Link>
                </div>
                {this.state.notes.map(note => <Note key = {note.id} title={note.title} content={note.content} tags={note.tags}/>)}
            </div>
        );

    }

}