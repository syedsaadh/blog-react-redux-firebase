import React, { Component } from 'react';

let footerStyle = {bottom:'0',right:'0',left:'0'};

export default class Footer extends Component {
    render() {
        return (
        <footer className="footer" style={footerStyle}>
            <div className="container">
                <div className="clearfix">
                </div>
                <div className="footer-copyright text-center">Copyright © 2017 Blog.All rights reserved.</div>
            </div>
        </footer>
        )

    }
}