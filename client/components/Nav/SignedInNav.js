import React from 'react';
import { Link } from 'react-router-dom';
import { MenuItem, Menu } from '@material-ui/core';
import { useTheme, makeStyles } from '@material-ui/styles';
import NavButton from './NavButton';

const SignedInNav = () => {
  const theme = useTheme();

  const useStyles = makeStyles({
    button: {
      color: theme.palette.text.primary,
      fontSize: 'medium',
      fontFamily: theme.typography.fontFamily,
    },
  });
  const classes = useStyles();

  return (
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
  );
};

export default SignedInNav;
