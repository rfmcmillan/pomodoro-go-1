import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { authenticateGoogle, logout, me } from '../../store';
import { GoogleLogin, GoogleLogout } from 'react-google-login';

import {
  AppBar,
  Button,
  Toolbar,
  IconButton,
  Typography,
  MenuItem,
  Menu,
  Avatar,
} from '@material-ui/core';
import { AccountBox, HomeOutlined } from '@material-ui/icons';
import { useTheme, makeStyles } from '@material-ui/styles';
import NavButton from './NavButton';

const Navbar = (props) => {
  const theme = useTheme();
  const useStyles = makeStyles({
    header: {
      color: 'black',
      backgroundColor: '#ffffff00',
      boxShadow: 'none',
      height: 60,
    },
    button: {
      color: theme.palette.text.primary,
      fontSize: 'medium',
      fontFamily: theme.typography.fontFamily,
    },
    login: { color: 'black' },
  });
  const classes = useStyles();

  const [isGoogleLoggedIn, setIsGoogleLoggedIn] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [authInstance, setAuthInstance] = useState({});
  const handleSuccess = (response) => {
    console.log(response);
    props.getMe(response);
  };
  const handleFail = (response) => {
    console.log('sign in failure', response);
  };
  const handleLogOut = () => {
    clearInterval(window.timer);
    setAnchorEl(null);
    window.localStorage.clear();
    props.handleClick();
  };

  const { isLoggedIn } = props;

  return (
    <div>
      <nav id="navBar">
        {chrome.storage ? (
          <AppBar position="static" className={classes.header}>
            <Toolbar elevation={0}>
              <Typography id="pomo-go" align="center" variant="h4">
                Pomodoro,go!
              </Typography>
            </Toolbar>
          </AppBar>
        ) : (
          <AppBar position="static" className={classes.header}>
            <Toolbar>
              <Typography
                id="pomo-go"
                variant="h4"
                style={{ fontFamily: 'Righteous' }}
              >
                PomodoroGo.
              </Typography>

              {isLoggedIn ? (
                <>
                  <NavButton
                    className={classes.button}
                    id="home"
                    aria-label="home"
                    // edge="start"
                    component={Link}
                    to="/home"
                  >
                    Home
                  </NavButton>
                  <NavButton
                    className={classes.button}
                    id="dashboard"
                    // edge="start"
                    component={Link}
                    to="/dashboard"
                  >
                    Dashboard
                  </NavButton>
                  <NavButton
                    className={classes.button}
                    id="blocksites"
                    // aria-label="menu"
                    edge="start"
                    component={Link}
                    to="/blocksites"
                  >
                    BlockList
                  </NavButton>
                  <NavButton
                    className={classes.button}
                    id="friends"
                    edge="start"
                    component={Link}
                    to="/friends"
                  >
                    Friends
                  </NavButton>
                  <Menu
                    className={classes.button}
                    id="menu"
                    aria-label="menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    aria-haspopup="true"
                    onClose={() => setAnchorEl(null)}
                  >
                    <MenuItem onClick={handleLogOut}>Logout</MenuItem>
                  </Menu>
                </>
              ) : (
                <Menu
                  id="menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  aria-haspopup="true"
                  onClose={() => setAnchorEl(null)}
                >
                  <MenuItem
                    key="Login"
                    component={Link}
                    onClick={() => setAnchorEl(null)}
                    to="/login"
                  >
                    Log In
                  </MenuItem>
                  <MenuItem
                    key="sandboxLogin"
                    component={Link}
                    onClick={() => setAnchorEl(null)}
                    to="/sandboxLogin"
                  >
                    Log In To Sandbox
                  </MenuItem>
                  <MenuItem
                    key="SignUp"
                    onClick={() => setAnchorEl(null)}
                    component={Link}
                    to="/signup"
                  >
                    Sign Up
                  </MenuItem>
                </Menu>
              )}
              <div id="extension-login">
                <IconButton
                  className={classes.button}
                  id="account"
                  aria-label="menu"
                  aria-haspopup="true"
                  edge="start"
                  size="medium"
                  onClick={(ev) => setAnchorEl(ev.currentTarget)}
                >
                  <AccountBox />
                </IconButton>

                {props.isLoggedIn ? (
                  <GoogleLogout
                    clientId="811227993938-nd59os35t80qtuqgmul58232c54sbmsm.apps.googleusercontent.com"
                    buttonText="Logout"
                    onLogoutSuccess={handleLogOut}
                    isSignedIn={props.isLoggedIn}
                    render={(renderProps) => (
                      <Avatar
                        onClick={renderProps.onClick}
                        src="https://i.pinimg.com/originals/a3/d5/8f/a3d58f0b2820871d486e9851c0fdbb60.jpg"
                      />
                    )}
                  ></GoogleLogout>
                ) : (
                  <GoogleLogin
                    clientId="811227993938-nd59os35t80qtuqgmul58232c54sbmsm.apps.googleusercontent.com"
                    buttonText="Login"
                    onSuccess={handleSuccess}
                    onFailure={handleFail}
                    cookiePolicy={'single_host_origin'}
                    isSignedIn={props.isLoggedIn}
                    redirectUri={`${process.env.API_URL}/home`}
                    render={(renderProps) => (
                      <Avatar
                        onClick={renderProps.onClick}
                        src="https://img-authors.flaticon.com/google.jpg"
                      />
                    )}
                  />
                )}
              </div>
            </Toolbar>
          </AppBar>
        )}
      </nav>
    </div>
  );
};

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    isLoggedIn: !!state.auth.id,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleClick() {
      dispatch(logout());
    },
    getMe(data) {
      dispatch(authenticateGoogle(data));
    },
  };
};

export default connect(mapState, mapDispatch)(Navbar);
