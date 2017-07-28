import React, { Component } from 'react';
import * as markdown from 'markdown-it';
import renderHtml from 'react-render-html';
import '../../styles/WritePost.css';
import * as firebase from "firebase";
import slug from "slug";

var md = new markdown({
    html: true,
    linkify: true,
    typographer: true
})
export default class WritePost extends Component {
    constructor() {
        super();
        this.state = {
			title: '',
			desc: '> Write Left Side\n> And See Preview Right Side',
			valid: false,
		};
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentDidMount() {
		const database = firebase.database();
		const postListRef = database.ref('/posts');
		this.newPostRef = postListRef.push();
    }
    writePostData(title, desc) {
		this.newPostRef.set({
			title: title,
			desc : desc,
			slug : slug(title, {lower:true})
		});
    }
    getValidationState() {
		const length = this.state.title.length;
		if (length > 10) {
			return 'success';
		}
		else if (length > 5) return 'warning';
		else if (length > 0) return 'error';
    }
    handleSubmit(e) {
        e.preventDefault();
        console.log(this.state);
		if(this.getValidationState() !== 'success') return alert("Incomplete Form");
		this.writePostData(this.state.title, this.state.desc);
		alert("Added Post");
		this.setState({
			title: '',
			desc: ''
		});
	}
    handleChange(e) {
        const target = e.target;
        this.setState({
            [target.name]: target.value
        })
    }
    render() {
        return (
            <div>
                <div className="row pad-top-bottom">
                    <input type="text" className="input-borderless" name="title" placeholder="Title" value={this.state.title}  onChange={this.handleChange.bind(this)}/>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <textarea name="desc" className="textarea" onChange={this.handleChange.bind(this)} value={this.state.desc}></textarea>
                    </div>
                    <div className="col-md-6 preview">
                        {renderHtml(md.render(this.state.desc || ''))}
                    </div>
                </div>
                <div className="row pad-top-bottom">
                    <div className="col-md-4 pull-right">
                    <button className="btn btn-primary btn-block" onClick={this.handleSubmit}>Publish</button>
                    </div>    
                </div>
            </div>
        )
    }
}