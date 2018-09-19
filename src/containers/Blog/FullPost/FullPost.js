import React, { Component } from 'react';
import axios from 'axios';
import './FullPost.css';

class FullPost extends Component {
    state = {
        loaderPost: null
    }
    componentDidMount() {
        this.loadData();
    }

    componentDidUpdate () {
        this.loadData();
    }

    loadData () {
        console.log(this.props);
        if(this.props.match.params.id) {
            if(!this.state.loaderPost || (this.state.loaderPost && this.state.loaderPost.id !== +this.props.match.params.id)) {
                axios.get('/posts/' + this.props.match.params.id)
                    .then(respone => {
                        this.setState({loaderPost: respone.data});
                        // console.log(respone);
                    });
            }
        }
    }

    deletePostHandler = () => {
        axios.delete('/posts/' + this.props.match.params.id)
            .then(respone => {
                console.log(respone);
            });
    }

    render () {
        let post = <p style={{textAlign: 'center'}}>Please select a Post!</p>;
        if(this.props.match.params.id) {
            post = <p style={{textAlign: 'center'}}>Loading...!</p>;
        }
        if(this.state.loaderPost) {
            post = (
                <div className="FullPost">
                    <h1>{this.state.loaderPost.title}</h1>
                    <p>{this.state.loaderPost.body}</p>
                    <div className="Edit">
                        <button className="Delete" onClick={this.deletePostHandler}>Delete</button>
                    </div>
                </div>

            );
        }
        return post;
    }
}

export default FullPost;
