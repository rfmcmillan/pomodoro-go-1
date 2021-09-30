import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import AvatarGroup from '@material-ui/lab/AvatarGroup';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import GitHubIcon from '@material-ui/icons/GitHub';
import EmailIcon from '@material-ui/icons/Email';

const useStyles = makeStyles((theme) => ({
  avatars: {},
  avatar: {
    width: 100,
    height: 100,
  },
}));

const TeamProfile = (props) => {
  const classes = useStyles();

  const [expanded, setExpanded] = useState({
    russel: true,
    ding: false,
    stephan: false,
    felicity: false,
  });

  const toggle = (ev) => {
    const name = ev.target.alt;
    if (expanded[name] === true) {
      setExpanded({ ...expanded, [ev.target.alt]: false });
    } else {
      setExpanded({ ...expanded, [ev.target.alt]: true });
    }
  };

  return (
    <Grid container direction="column">
      <Grid item container>
        <Avatar
          alt="russel"
          src="https://ca.slack-edge.com/T024FPYBQ-U01K4T2GC7J-729e221b6004-512"
          className={classes.avatar}
          onClick={toggle}
        />

        <div className="each-profile">
          <div className="dev-name">
            Russel
            <br />
            McMillan
          </div>
          <div className="links">
            <a
              target="_blank"
              rel="noreferrer"
              href="https://github.com/rfmcmillan"
            >
              <GitHubIcon />
            </a>
            <LinkedInIcon />
            <EmailIcon />
          </div>
        </div>
      </Grid>
      <Grid item container>
        <Avatar
          alt="ding"
          src="https://ca.slack-edge.com/T024FPYBQ-U01J88VDNSJ-bf4326c217e1-512"
          className={classes.avatar}
          onClick={toggle}
        />

        <div className="each-profile">
          <div className="dev-name">
            Yiru
            <br />
            Ding
          </div>
          <div className="links">
            <a
              target="_blank"
              rel="noreferrer"
              href="https://github.com/YiruDing"
            >
              <GitHubIcon />
            </a>
            <a
              target="_blank"
              rel="noreferrer"
              href="https://www.linkedin.com/in/yiru-ding/"
            >
              <LinkedInIcon />
            </a>
            <a href="">
              <EmailIcon />
            </a>
          </div>
        </div>
      </Grid>
      <Grid container>
        <Avatar
          alt="stephan"
          src="https://ca.slack-edge.com/T024FPYBQ-U01JF29P57C-c12ee469d629-512"
          className={classes.avatar}
          onClick={toggle}
        />

        <div className="each-profile">
          <div className="dev-name">
            Stephan
            <br />
            Alas
          </div>
          <div className="links">
            <a
              target="_blank"
              rel="noreferrer"
              href="https://github.com/stephanalas"
            >
              <GitHubIcon />
            </a>
            <LinkedInIcon />
            <EmailIcon />
          </div>
        </div>
      </Grid>
      <Grid container>
        <Avatar
          alt="felicity"
          src="https://ca.slack-edge.com/T024FPYBQ-U01JF8BDK35-fc70b3a47007-512"
          className={classes.avatar}
          onClick={toggle}
        />

        <div className="each-profile">
          <div className="dev-name">
            Felicity
            <br />
            Wu
          </div>
          <div className="links">
            <a
              target="_blank"
              rel="noreferrer"
              href="https://github.com/felicityandherdragon"
            >
              <GitHubIcon />
            </a>
            <LinkedInIcon />
            <EmailIcon />
          </div>
        </div>
      </Grid>
    </Grid>
  );
};

export default TeamProfile;
