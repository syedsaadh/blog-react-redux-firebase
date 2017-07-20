import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {selectArticle} from '../actions'
export default class PostList extends Component {
    createList() {
        const {dispatch} = this.props;
        return this.props.posts.map((post, i) => {
            return (
                <Link to={`/post/${post.slug}`} key={i}>
                <li  onClick={() => dispatch(selectArticle(post.slug, post))}>{post.title}</li>
                </Link>
            );
        })
    }
    render() {
        return (
            <ul>
                {
                    this.createList()
                }
            </ul>
        )
    }
}