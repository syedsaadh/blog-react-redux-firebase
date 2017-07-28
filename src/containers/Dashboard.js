import React from "react";
import { connect } from 'react-redux';
import {
    Switch,
    Route
} from 'react-router-dom';
import { logOutUser } from '../actions/sessionActions';
import MyStories from './Dashboard/MyStories';
import WritePost from './Dashboard/WritePost';
import Home from './Dashboard/Home';

class Dashboard extends React.Component {
    handleLogout() {
        const { dispatch } = this.props;
        dispatch(logOutUser())
    }
    componentWillMount() {
        const { history, session } = this.props;
        if (!session) {
            history.push('/');
        }
    }
    componentWillReceiveProps(nextProps) {
        if (!nextProps.session) {
            const { history } = nextProps;
            history.push('/');
        }
    }
    render() {
        console.log(this.props);
        return (
                <div className="container">
                    <Switch>
                        <Route exact path="/dashboard" component={Home} />
                        <Route path="/dashboard/write" component={WritePost} />
                        <Route path="/dashboard/stories" component={MyStories} />
                    </Switch>
                </div>
        );
    }
}

const mapStateToProps = state => {
    const { session } = state;
    return {
        session
    }
}
export default connect(mapStateToProps)(Dashboard);