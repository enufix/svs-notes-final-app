import React, {Component} from 'react';
import axios from 'axios';
import './ManageTags.css';


export default class ManageTags extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            tags: [],
            nameErrorMessage: "",
            buttonDisabled: true
        };
    }

    componentDidMount() {
        axios.get('/api/tags').then(res => {
            this.setState({tags: res.data});
        })
    }

    handleTagName = (event) => {
        this.setState({name: event.target.value});
        if (event.target.value === "") {
            this.setState({nameErrorMessage: "Name is a mandatory field"});
            this.setState({buttonDisabled: true})
        } else {
            this.setState({buttonDisabled: false})
        }
    }

    handleSubmit = (event) => {
        const name = this.state.name;
        axios.post('/api/tags', {name}).then(res => console.log(res))
    }

    handleEditTag(tag) {
        return undefined;
    }

    handleDeleteTag = (id) => {
        const newTagsState = this.state.tags.filter((tag) => tag.id !== id);
        axios.delete((`/api/tags/${id}`))
            .then((res) => this.setState({ tags: newTagsState }) )
    }

    render() {
        return(
            <div className="create-tag">
                <form onSubmit={this.handleSubmit}>
                    <input name="tag" placeholder="Create new tag..." className="create-tag-name" onChange={this.handleTagName}/>
                    <input disabled={this.state.buttonDisabled} type="submit" className="create-tag-button" value="Create"/>
                    {this.state.tags.map((tag, index) =>
                        <div className="created-tags">
                            <input key={tag.id} value={tag.name} onChange={this.handleEditTag(tag)}/>
                            <input type="button" onClick={() => this.handleDeleteTag(tag.id)} value="Delete"/>
                        </div>
                    )}
                </form>
                <br/>

            </div>
        )
    }


}

