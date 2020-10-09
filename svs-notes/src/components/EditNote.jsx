import React, {Component} from 'react';
import axios from 'axios';
import './EditNote.css';

export default class EditNoteForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            content: "",
            titleErrorMessage: "",
            contentErrorMessage: "",
            tags:[],
            buttonDisabled: true,
        };
    }
    componentDidMount() {
        axios.get(`/api/tags`).then((res) => {
            console.log(res);
            this.setState({ tags: res.data });
        });

        axios.get("/api/notes/" + this.props.match.params.id)
            .then(res => {
                console.log(res);
                this.setState({
                    content: res.data.content,
                    title: res.data.title,
                })
            })

    }

    handleTitleChange = (event) => {
        this.setState({title: event.target.value});
        if (event.target.value === "") {
            this.setState({titleErrorMessage: "Title is a mandatory field"});
            this.setState({buttonDisabled: true})
        }  else {
            this.setState({buttonDisabled: false})
        }
    }
    handleContentChange = (event) => {
        this.setState({content: event.target.value});
        if (event.target.value === "") {
            this.setState({contentErrorMessage: "Content is a mandatory field"});
            this.setState({buttonDisabled: true})
        } else {
            this.setState({buttonDisabled: false})
        }
    }


    editNote = (id) => {
        const data = {
            title: this.state.title,
            content: this.state.content,
        }
        axios.put('/api/notes/' + id, data)
            .then(res => {
                console.log(res);
            })
    }

    handleSubmit = (e)  => {
        const id = this.state.id;
        const note = {
            title: this.state.title,
            content: this.state.content,
        }
        axios.put(`/api/notes/${id}`, note)
            .then(res => console.log(res))
            .catch(err => console.log(err))
    }


    render() {
        return <div className="edit-note">
            <form onSubmit={this.handleSubmit}>
                <input name="title" className="edit-note-title" placeholder="Enter title..." value={this.state.title} onChange={this.handleTitleChange}/>
                <textarea name="content" className="edit-note-content" placeholder="Type here..." value={this.state.content} onChange={this.handleContentChange}/>
                <button disabled={this.state.buttonDisabled} type="submit" className="edit-note-save-button" onClick={() => this.editNote(this.props.match.params.id)}>Save</button>
            </form>
            <button className="create-note-cancel-button" onClick={() => (window.location.href = "/")}>Cancel</button>
            <select id="selectTag">
                {this.state.tags.map(tag => <option value={tag.id} key={tag.name}>#{tag.name}</option> )}
            </select>
            <br/>
        </div>;
    }
}

export const Example = () => <EditNoteForm defaultTitle="Default title" defaultContent="Default Content"/>;