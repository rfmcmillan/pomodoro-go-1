import React, { Component } from 'react';
import { connect, useSelector } from 'react-redux';
import { withRouter, Route, Switch, Redirect } from 'react-router-dom';
import { Login, Signup } from './components/AuthForm';
import CreateSession from './components/Timer/CreateSession';
import Home from './components/Home';
import Dashboard from './components/Dashboard/Dashboard';
import { me } from './store';
import { loadSessions } from './store/sessions';
import { loadBlackList, updateBlackList } from './store/blackList';
import { loadBlocks } from './store/blocks';
import { loadSites, updateSite } from './store/sites';
import { getSites } from './store/blockSites';
import BlockError from './components/BlockError';
import BlockSites from './components/BlockSites';
import Player from './components/Player';
import Friends from './components/Friends/Friends';
import RedirectToSite from './components/RedirectToSite';

import Intro from './components/Intro';

/**
 * COMPONENT
 */
class Routes extends Component {
  constructor(props) {
    super(props);
  }
  async componentDidMount() {
    await this.props.loadInitialData();
  }

  async componentDidUpdate(prevProps) {
    if (this.props.auth && this.props.auth.id !== prevProps.auth.id) {
      await this.props.getSites(this.props.auth.id);
    }

    chrome?.runtime?.sendMessage('kaghhmclljbnigfffgjhfbbbcpgenjoi', {
      message: 'set-blocked-sites',
      blockedSites: this.props.blockedSites.filter((each) => {
        return each.blacklist.blockingEnabled === true;
      }),
      currUser: this.props.auth.id,
    });

    // chrome?.runtime?.onMessage?.addListener(function(request, sender, sendResponse){
    //   console.log(request.msg);
    // });
  }
  render() {
    const { isLoggedIn, auth, blackList, updateB } = this.props;
    //this enters auth and blackList into chrome.storage so it can be accessed
    //in background.js file

    //this listens for changes in chrome.storage so that it can update the database
    // with the updated blacklist info
    if (chrome.storage)
      chrome.storage.onChanged.addListener(async (changes, areaName) => {
        if (changes.updatedBlackList) {
          const {
            updatedBlackList: { oldValue, newValue },
          } = changes;
          if (!oldValue) {
            updateB(newValue.id, newValue);
          } else if (oldValue.blocks !== newValue.blocks) {
            updateB(newValue.id, newValue);
          }
        }
      });

    return (
      <div style={{ height: '100%' }}>
        {chrome.storage ? <RedirectToSite /> : null}
        {isLoggedIn && !chrome.storage ? (
          <Switch>
            <Route path="/home" component={Home} />
            <Route path="/login">
              <Redirect to="/home" />
            </Route>
            <Route exact path="/">
              <Redirect to="/home" />
            </Route>
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/timer" exact component={CreateSession} />
            <Route exact path="/blocksites" component={BlockSites} />
            <Route exact path="/friends" component={Friends} />
            <Route exact path="/uhoh" component={BlockError} />
          </Switch>
        ) : (
          <Switch>
            <Route path="/" exact component={Intro} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <Route exact path="/uhoh" component={BlockError} />
            <Route path="/dashboard" component={Dashboard} />
          </Switch>
        )}
      </div>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.auth that has a truthy id.
    // Otherwise, state.auth will be an empty object, and state.auth.id will be falsey
    isLoggedIn: !!state.auth.id,
    sites: state.sites,
    auth: state.auth,
    blackList: state.blackList,
    blockedSites: state.blockedSites,
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadInitialData() {
      dispatch(me());
      dispatch(loadSessions());
      dispatch(loadSites());
      dispatch(loadBlackList());
      dispatch(loadBlocks());
    },

    updateB: (blackListId, blackListInfo) => {
      return dispatch(updateBlackList(blackListId, blackListInfo));
    },

    getSites: (userId) => {
      return dispatch(getSites(userId));
    },
  };
};

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes));
