import React, { useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { authenticateGoogle, logout } from "../../store";
import {
  AppBar,
  Grid,
  Button,
  Toolbar,
  MenuItem,
  Menu,
} from "@material-ui/core";
import { useTheme, makeStyles } from "@material-ui/styles";
import NavButton from "./NavButton";

const Navbar = (props) => {
  const theme = useTheme();
  const useStyles = makeStyles({
    header: {
      color: "black",
      backgroundColor: "#ffffff00",
      boxShadow: "none",
      height: 60,
    },
    button: {
      color: theme.palette.text.primary,
      fontSize: "medium",
      fontFamily: theme.typography.fontFamily,
    },
    login: { color: "black" },
    loggedIn: { justifyContent: "flexEnd", width: 130 },
    loggedOut: { justifyContent: "flexEnd", width: 300 },
    logo: { fontFamily: "Righteous", color: "black", fontSize: 34 },
    signup: {
      borderRadius: 40,
      backgroundColor: "black",
      color: "white",
      fontSize: 14,
    },
    signIn: {
      backgroundColor: "#ffffff00",
      color: "black",
    },
    sandboxLogin: {
      backgroundColor: "#ffffff00",
      color: "black",
    },
  });
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = useState(null);
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
        <AppBar position="static" className={classes.header}>
          <Toolbar>
            <NavButton
              className={classes.logo}
              component={Link}
              to="/home"
              disableFocusRipple={true}
              disableRipple={true}
            >
              PomodoroGo
            </NavButton>
            {isLoggedIn ? (
              <>
                {navigator.userAgent.indexOf("Chrome") !== -1 ? (
                  <NavButton
                    className={classes.button}
                    aria-label="timer"
                    component={Link}
                    to="/timer"
                  >
                    Timer
                  </NavButton>
                ) : (
                  ""
                )}
                <NavButton
                  className={classes.button}
                  id="dashboard"
                  component={Link}
                  to="/dashboard"
                >
                  Dashboard
                </NavButton>
                {navigator.userAgent.indexOf("Chrome") !== -1 ? (
                  <NavButton
                    className={classes.button}
                    id="blocksites"
                    component={Link}
                    to="/blocksites"
                  >
                    BlockList
                  </NavButton>
                ) : (
                  ""
                )}
                <NavButton
                  className={classes.button}
                  id="friends"
                  component={Link}
                  to="/friends"
                >
                  Friends
                </NavButton>
                <NavButton
                  className={classes.button}
                  id="about"
                  component={Link}
                  to="/about"
                >
                  About
                </NavButton>
              </>
            ) : (
              <Grid container id="extension-login">
                <Grid item>
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
                  </Menu>
                </Grid>
              </Grid>
            )}

            {isLoggedIn ? (
              <Grid container className={classes.loggedIn}>
                <Grid item>
                  <Button onClick={handleLogOut}>Logout</Button>
                </Grid>
              </Grid>
            ) : (
              <Grid container className={classes.loggedOut}>
                <Grid item>
                  <NavButton
                    variant="text"
                    className={classes.sandboxLogin}
                    component={Link}
                    to="/sandboxLogin"
                  >
                    Sandbox
                  </NavButton>
                </Grid>
                <Grid>
                  <NavButton
                    variant="text"
                    className={classes.signIn}
                    component={Link}
                    to="/login"
                  >
                    Sign In
                  </NavButton>
                </Grid>
                <Grid>
                  <NavButton
                    variant="contained"
                    className={classes.signup}
                    component={Link}
                    to="/signup"
                  >
                    Sign Up
                  </NavButton>
                </Grid>
              </Grid>
            )}
          </Toolbar>
        </AppBar>
      </nav>
    </div>
  );
};

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
