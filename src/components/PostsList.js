import React, { Component } from 'react';
import { Link } from 'react-router-dom';
export default class PostList extends Component {
    createList() {
        return this.props.posts.map((post, i) => {
            return (
                <Link to={`/post/${post.slug}`} key={i}>
                <li  onClick={() => console.log(post.title)}>{post.title}</li>
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