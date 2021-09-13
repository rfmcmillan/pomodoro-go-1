import React from 'react';
import { Button, Dialog } from '@material-ui/core';
import Typical from 'react-typical';
import TeamProfile from '../TeamProfile';
import DialogChoice from './DialogChoice';

const About = () => {
  return (
    <div id="intro-content">
      <div className="paper">
        <div className="lines">
          <div className="text">
            <DialogChoice />
            <Typical
              steps={[
                'Hello there 👋',
                3000,
                'Welcome to Pomodoro Go 🍅!',
                3000,
                'This is an app that helps you boost your productivity by, providing you a focus timer, blocking time-wasting websites and giving you useful data about your focus sessions!',
                3000,
              ]}
              loop={2}
              wrapper="h3"
            />
            <Typical
              steps={['Brought to you by these lovely folks 👉', 5000]}
              // loop={3}
              wrapper="p"
            />
            <Button
              variant="outlined"
              color="primary"
              target="_blank"
              rel="noreferrer"
              href="https://github.com/2101-Warriors/pomodoro-go"
            >
              Link to repo
            </Button>
          </div>
        </div>
        <div className="holes hole-top"></div>
        <div className="holes hole-middle"></div>
        <div className="holes hole-bottom"></div>
      </div>
      <TeamProfile />
    </div>
  );
};

export default About;
