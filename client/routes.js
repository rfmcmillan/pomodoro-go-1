import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Route, Switch, Redirect } from 'react-router-dom';
import { Login, Signup } from './components/AuthForm';
import SandboxLogin from './components/AuthForm/SandboxLogin';
import CreateSession from './components/Timer/CreateSession';
import Timer from './components/Timer';
import Dashboard from './components/Dashboard';
import { me } from './store';
import { loadSessions } from './store/sessions';
import { loadBlackList, updateBlackList } from './store/blackList';
import { loadBlocks } from './store/blocks';
import { loadSites } from './store/sites';
import { getSites } from './store/blockSites';
import BlockError from './components/BlockError';
import BlockSites from './components/BlockSites';
import Friends from './components/Friends/Friends';
import RedirectToSite from './components/RedirectToSite';
import About from './components/About';
import { setStoredAuth, getStoredAuth } from './storage.js';

class Routes extends Component {
  constructor(props) {
    super(props);
  }
  async componentDidMount() {
    await this.props.loadInitialData();
    console.log('this.props:', this.props);
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
  }
  render() {
    const { isLoggedIn, auth, blackList, updateB } = this.props;

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
      <div>
        {/* {chrome.storage ? <RedirectToSite /> : null} */}
        {isLoggedIn ? (
          <Switch>
            <Route path="/timer" component={Timer} />
            <Route path="/login">
              <Redirect to="/dashboard" />
            </Route>
            <Route path="/sandboxLogin">
              <Redirect to="/dashboard" />
            </Route>
            <Route path="/" exact component={Timer} />
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/timer" exact component={CreateSession} />
            <Route exact path="/blocksites" component={BlockSites} />
            <Route exact path="/friends" component={Friends} />
            <Route exact path="/uhoh" component={BlockError} />
            <Route path="/about" component={About} />
          </Switch>
        ) : (
          <Switch>
            <Route path="/about" component={About} />
            <Route path="/sandboxLogin" component={SandboxLogin} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <Route exact path="/uhoh" component={BlockError} />
          </Switch>
        )}
      </div>
    );
  }
}

const mapState = (state) => {
  return {
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

export default withRouter(connect(mapState, mapDispatch)(Routes));
