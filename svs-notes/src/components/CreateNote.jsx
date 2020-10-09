import React, {Component} from 'react';
import axios from 'axios';
import './CreateNote.css';

export default class CreateNote extends Component {

    constructor(props) {
        super(props);
        this.state = {
            title: "",
            content: "",
            tags: [],
            titleErrorMessage: "",
            contentErrorMessage: "",
            buttonDisabled: true,
        };
    }

    componentDidMount() {
        axios.get('/api/tags').then(res => {
            this.setState({tags: res.data});
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

    handleSubmit = (event) => {
        let title = this.state.title;
        let content = this.state.content;
        axios.post('/api/notes', {title, content}).then(res => console.log(res))
    }


    render() {
        return <div className="create-note">
            <form onSubmit={this.handleSubmit}>
                <input name="title" className="create-note-title" placeholder="Enter title..." value={this.state.title} onChange={this.handleTitleChange}/>
                <textarea name="content" className="create-note-content" placeholder="Type here..." value={this.state.content} onChange={this.handleContentChange}/>
                <button disabled={this.state.buttonDisabled} type="submit" className="create-note-save-button" onClick={() => (window.location.href = "/")}>Save</button>
            </form>
            <select id="selectTag">
                {this.state.tags.map(tag => <option value={tag.id} key={tag.name}>#{tag.name}</option> )}
            </select>
            <br/>
            <button className="create-note-cancel-button" onClick={() => (window.location.href = "/")}>Cancel</button>
        </div>;
    }
}

export const Example = () => <CreateNote defaultTitle="Default title" defaultContent="Default Content"/>;