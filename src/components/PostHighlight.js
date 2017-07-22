import React, { Component } from 'react';
import '../styles/PostHighlight.css';
import {Link} from 'react-router-dom';
import {truncate} from 'lodash';
import * as removeMd from "remove-markdown";

export default class PostHighlight extends Component {
    render() {
        const { data, onPostClick } = this.props;
        return (
            <article className="post-highlight">
                <header>
                    <span className="post-meta"></span>
                    <h2 className="post-title"><Link to={`/post/${data.slug}`} onClick={ e => onPostClick(data) }>{data.title}</Link></h2>
                </header>
                <section className="post-excerpt">
                    <p>{truncate(removeMd(data.desc), {'length':220})}</p>
                </section>
                
            </article>
        )
    }
}