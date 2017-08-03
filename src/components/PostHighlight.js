import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {each as _each} from 'lodash';
import {truncate} from 'lodash';
import {Tag} from 'element-react';
import * as removeMd from "remove-markdown";

import '../styles/PostHighlight.css';
import 'element-theme-default';

export default class PostHighlight extends Component {
    createTagList(tags) {
        if(!tags){
            return false;
        }
        return tags.map((name, key) => {
            return <Tag key={key} type="gray" style={{marginRight: '10px'}}>{ name }</Tag>
        })
    }
    render() {
        const { data, onPostClick } = this.props;
        return (
            <article className="post-highlight">
                <header>
                    <span className="post-meta"></span>
                    <h2 className="post-title">
                        <Link to={`/post/${data.slug}`} onClick={ e => onPostClick(data) }>{data.title}</Link>
                        <span className="date">12 AUG 2017</span>
                    </h2>
                </header>
                <section className="post-excerpt">
                    <p>{truncate(removeMd(data.desc), {'length':220})}</p>
                    { this.createTagList(data.tags || null) }
                </section>
                
            </article>
        )
    }
}