import React, { Component } from 'react';
import * as markdown from 'markdown-it';
import renderHtml from 'react-render-html';
import '../../styles/WritePost.css';
import * as firebase from "firebase";
import slug from "slug";
import { Alert, Tag, Layout, Menu, Form, Select, DatePicker, Input, Radio, Button } from 'element-react';
import { i18n } from 'element-react'
import locale from 'element-react/src/locale/lang/en';
i18n.use(locale);


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
            tags: [],
            inputValue: '',
            inputVisible: false
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
            desc: desc,
            slug: slug(title, { lower: true })
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
        if (this.getValidationState() !== 'success') return alert("Incomplete Form");
        this.writePostData(this.state.title, this.state.desc);
        alert("Added Post");
        this.setState({
            title: '',
            desc: ''
        });
    }
    onKeyUp(e) {
        if (e.keyCode === 13) {
            this.handleInputConfirm();
        }
    }

    onChange(value) {
        this.setState({ inputValue: value });
    }
    handleChange(e) {
        const target = e.target;
        this.setState({
            [target.name]: target.value
        })
    }
    handleClose(index) {
        this.state.tags.splice(index, 1);
        this.forceUpdate();
    }
    showInput() {
        this.setState({ inputVisible: true }, () => {
            this.refs.saveTagInput.focus();
        });
    }

    handleInputConfirm() {
        let inputValue = this.state.inputValue;

        if (inputValue) {
            this.state.tags.push(inputValue);
        }

        this.state.inputVisible = false;
        this.state.inputValue = '';

        this.forceUpdate();
    }
    render() {
        return (
            <Layout.Row>
                <Layout.Row className="">
                    <input type="text" className="input-borderless" name="title" placeholder="Title" value={this.state.title} onChange={this.handleChange.bind(this)} />
                </Layout.Row>
                <Layout.Row className="pad-top-bottom">
                <Layout.Col span={24} className="tags-container">
                    {
                        this.state.tags.map((tag, index) => {
                            return (
                                <Tag
                                    key={Math.random()}
                                    closable={true}
                                    closeTransition={false}
                                    onClose={this.handleClose.bind(this, index)}>{tag}</Tag>
                            )
                        })
                    }
                    {
                        this.state.inputVisible ? (
                            <Input
                                style={{maxWidth:'100px'}}
                                value={this.state.inputValue}
                                ref="saveTagInput"
                                size="mini"
                                onChange={this.onChange.bind(this)}
                                onKeyUp={this.onKeyUp.bind(this)}
                                onBlur={this.handleInputConfirm.bind(this)}
                            />
                        ) : <Button className="button-new-tag" size="small" onClick={this.showInput.bind(this)}>+ New Tag</Button>
                    }
                    </Layout.Col>
                </Layout.Row>
                <Layout.Row>
                    <Layout.Col span={12}>
                        <textarea name="desc" className="textarea" onChange={this.handleChange.bind(this)} value={this.state.desc}></textarea>
                    </Layout.Col>
                    <Layout.Col span={12}>
                        {renderHtml(md.render(this.state.desc || ''))}
                    </Layout.Col>
                </Layout.Row>
                <Layout.Row className="pad-top-bottom">
                    <Layout.Col span={6} offset={18}>
                        <button className="btn btn-primary btn-block" onClick={this.handleSubmit}>Publish</button>
                    </Layout.Col>
                </Layout.Row>
            </Layout.Row>
        )
    }
}