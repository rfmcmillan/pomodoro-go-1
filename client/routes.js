import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Route, Switch, Redirect } from "react-router-dom";
import { Login, Signup } from "./components/AuthForm";
import SandboxLogin from "./components/AuthForm/SandboxLogin";
import CreateSession from "./components/Timer/CreateSession";
import Timer from "./components/Timer";
import Dashboard from "./components/Dashboard";
import { loadSessions } from "./store/sessions";
import { updateBlackList } from "./store/blackList";
import { loadBlocks } from "./store/blocks";
import { loadSites } from "./store/sites";
import { getSites } from "./store/blockSites";
import BlockError from "./components/BlockError";
import BlockSites from "./components/BlockSites";
import Friends from "./components/Friends/Friends";
import About from "./components/About";
import Home from "./components/Home";

class Routes extends Component {
    constructor(props) {
        super(props);
    }
    async componentDidMount() {
        await this.props.loadInitialData();
    }
    async componentDidUpdate(prevProps) {
        if (this.props.auth.id && this.props.auth.id !== prevProps.auth.id) {
            await this.props.getSites(this.props.auth.id);
        }
        if (navigator.userAgent.indexOf("Chrome") !== -1) {
            chrome?.runtime?.sendMessage("nmfhcdkehekkflbopjlnnihncpnlejho", {
                message: "set-blocked-sites",

                blockedSites: this.props.blockedSites.filter((each) => {
                    return each.blacklist.blockingEnabled === true;
                }),
                currUser: this.props.auth.id,
            });
        }
    }

    render() {
        const { isLoggedIn, auth, blackList, updateB, timer } = this.props;

        return (
            <div>
                {isLoggedIn ? (
                    <Switch>
                        <Route path="/timer">
                            <Timer timer={timer} />
                        </Route>
                        <Route path="/login">
                            <Redirect to="/dashboard" />
                        </Route>
                        <Route path="/sandboxLogin">
                            <Redirect to="/dashboard" />
                        </Route>
                        <Route path="/" exact component={Home} />
                        <Route path="/home" exact component={Home} />
                        <Route path="/dashboard" component={Dashboard} />
                        <Route path="/timer" exact>
                            <CreateSession />
                        </Route>
                        <Route
                            exact
                            path="/blocksites"
                            component={BlockSites}
                        />
                        <Route exact path="/friends" component={Friends} />
                        <Route exact path="/blocked" component={BlockError} />
                        <Route path="/about" component={About} />
                    </Switch>
                ) : (
                    <Switch>
                        <Route path="/" exact component={Home} />
                        <Route path="/about" component={About} />
                        <Route path="/home" exact component={Home} />
                        <Route path="/sandboxLogin" component={SandboxLogin} />
                        <Route path="/login" component={Login} />
                        <Route path="/signup" component={Signup} />
                        <Route exact path="/blocked" component={BlockError} />
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
            dispatch(loadSessions());
            dispatch(loadSites());
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
