import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import AvatarGroup from '@material-ui/lab/AvatarGroup';
import { Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import GitHubIcon from '@material-ui/icons/GitHub';
import EmailIcon from '@material-ui/icons/Email';

const useStyles = makeStyles((theme) => ({
  avatar: {
    width: 100,
    height: 100,
    border: '1px solid #999999',
  },
  icons: {
    color: 'black',
    fontSize: 46,
  },
  links: {
    width: '60%',
    display: 'flex',
    justifyContent: 'space-around',
    padding: '10px',
  },
  root: { width: 1216 },
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
    <Grid className={classes.root} container alignItems="center" spacing={2}>
      <Grid item container xs={6} justifyContent="center">
        <Grid item>
          <Avatar
            alt="russel"
            src="https://ca.slack-edge.com/T024FPYBQ-U01K4T2GC7J-729e221b6004-512"
            className={classes.avatar}
            onClick={toggle}
          />
        </Grid>
        <Grid item>
          <div className="each-profile">
            <div className="dev-name">
              Russel
              <br />
              McMillan
            </div>
            <div className={classes.links}>
              <a
                target="_blank"
                rel="noreferrer"
                href="https://github.com/rfmcmillan"
              >
                <GitHubIcon className={classes.icons} />
              </a>
              <a
                target="_blank"
                rel="noreferrer"
                href="https://www.linkedin.com/in/russelmcmillan/"
              >
                <LinkedInIcon className={classes.icons} />
              </a>
              <a href="mailto:rfmcmillan@gmail.com">
                <EmailIcon className={classes.icons} />
              </a>
            </div>
          </div>
        </Grid>
      </Grid>
      <Grid item container xs={6} justifyContent="center">
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
          <div className={classes.links}>
            <a
              target="_blank"
              rel="noreferrer"
              href="https://github.com/YiruDing"
            >
              <GitHubIcon className={classes.icons} />
            </a>
            <a
              target="_blank"
              rel="noreferrer"
              href="https://www.linkedin.com/in/yiru-ding/"
            >
              <LinkedInIcon className={classes.icons} />
            </a>
            <a href="mailto:dingyr0925@gmail.com">
              <EmailIcon className={classes.icons} />
            </a>
          </div>
        </div>
      </Grid>
      <Grid item container xs={6} justifyContent="center">
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
          <div className={classes.links}>
            <a
              target="_blank"
              rel="noreferrer"
              href="https://github.com/stephanalas"
            >
              <GitHubIcon className={classes.icons} />
            </a>
            <a
              target="_blank"
              rel="noreferrer"
              href="https://www.linkedin.com/in/stephanalas/"
            >
              <LinkedInIcon className={classes.icons} />
            </a>
            <a href="mailto:stephan.j.alas@gmail.com">
              <EmailIcon className={classes.icons} />
            </a>
          </div>
        </div>
      </Grid>
      <Grid item container xs={6} justifyContent="center">
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
          <div className={classes.links}>
            <a
              target="_blank"
              rel="noreferrer"
              href="https://github.com/felicityandherdragon"
            >
              <GitHubIcon className={classes.icons} />
            </a>
          </div>
        </div>
      </Grid>
    </Grid>
  );
};

export default TeamProfile;
