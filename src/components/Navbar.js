import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { deauthenticate, authenticate } from '../actions/sessionActions';
import '../styles/Navbar.css';
class Navbar extends Component {
  handleSignIn() {
    const { dispatch } = this.props;
    dispatch(authenticate());
  }
  handleLogout() {
     const { dispatch } = this.props;
     dispatch(deauthenticate())
  }
  render() {
    const { session } = this.props;
    let button = null;
    if (!session) {
      button = <a onClick={this.handleSignIn.bind(this)}>LOGIN</a>
    } else {
      button = <a onClick={this.handleLogout.bind(this)}>LOGOUT</a>
    }
    return (
      <nav className="navbar navbar-default" role="navigation">
        <div className="container-fluid">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <Link className="navbar-brand" to="/">ReactRedux Blog</Link>
          </div>
          <div className="collapse navbar-collapse" id="myNavbar">
            <ul className="nav navbar-nav navbar-right">
              {session && <li><Link to="/dashboard">DASHBOARD</Link></li>}
              <li>{button}</li>
            </ul>
          </div>
        </div>
      </nav>
    )
  }
}
const mapStateToProps = state => {
  const { session } = state;
  return {
    session
  }
}
export default connect(mapStateToProps)(Navbar);