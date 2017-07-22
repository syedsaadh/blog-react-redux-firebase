import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { selectArticle } from '../actions'
import PostHighlight from '../components/PostHighlight';
export default class PostList extends Component {
    constructor(){
        super();
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick(post){
        const { dispatch } = this.props;
        dispatch(selectArticle(post.slug, post));
    }
    createList() {
        
        return this.props.posts.map((post, i) => {
            return (
                <PostHighlight key={post.slug} data={post} onPostClick={this.handleClick} />
            );
        })
    }
    render() {
        return (
            <div>
                {
                    this.createList()
                }
            </div>
        )
    }
}