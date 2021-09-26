import React, { useState, useContext, useEffect } from 'react';
import { Button, Typography, makeStyles, Card, Grid } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import { connect, useDispatch, useSelector } from 'react-redux';
import { updateSession } from '../../store/sessions';
import StopButton from './StopButton';
import { SessionContext } from '../../app';
import { TimerContext } from './CreateSession';
import { Circle } from 'rc-progress';
import {
  setStoredIsRunning,
  setStoredTimer,
  getStoredDisplayTime,
} from '../../storage';

const useStyles = makeStyles(() => ({
  timerContainer: {
    borderRadius: '15px',
    height: '500px',
    width: '500px',
    margin: '35px',
    padding: '10px',
  },
  timer: {
    fontSize: '100px',
  },
}));

const msToHMS = (ms) => {
  let seconds = ms / 1000;

  let hours = parseInt(seconds / 3600);
  seconds = seconds % 3600;

  let minutes = parseInt(seconds / 60);
  seconds = seconds % 60;

  hours = hours < 10 ? '0' + hours : hours;
  minutes = minutes < 10 ? '0' + minutes : minutes;
  seconds = seconds < 10 ? (seconds >= 0 ? '0' + seconds : '00') : seconds;
  return hours + ':' + minutes + ':' + seconds;
};

const Stopwatch = (props) => {
  const { updateSession, timer } = props;
  const displayTime = msToHMS(timer);
  const classes = useStyles();
  const theme = useTheme();
  const { primary } = theme.palette;
  const currentSession = useSelector((state) => state.currentSession);
  const { expectedEndTime, startTime } = currentSession;
  const end = Date.parse(expectedEndTime);
  const start = Date.parse(startTime);
  const { setCountDown, sessionTime, countDown, setSessionTime } =
    useContext(SessionContext);

  const targetTime = end - start;

  const stopBackgroundTimer = () => {
    chrome.storage.local.set({ isRunning: false });
  };

  const toggleTimer = (ev) => {
    const button = ev.target.innerText;

    if (button === 'START') {
      console.log('currentSession.sessionTime:', currentSession.sessionTime);

      setStoredIsRunning(true);
      setStoredTimer(sessionTime);
      if (!currentSession.sessionTime) {
        updateSession(currentSession.id, { sessionTime });
      }
      chrome.alarms.create('startTimer', { when: Date.now() + sessionTime });
      localStorage.setItem('currentSession', JSON.stringify(currentSession));
      setCountDown(true);
    }
    if (button === 'STOP' || button === 'PAUSE') {
      stopBackgroundTimer();
      setCountDown(false);
    }
  };

  return (
    <div>
      <Card className={classes.timerContainer} elevation={10}>
        <Grid container direction="column" alignItems="center">
          <Grid item>
            <Typography
              variant="h1"
              className={classes.timer}
              style={{
                position: 'relative',
                top: '185px',
              }}
            >
              {displayTime}{' '}
            </Typography>
          </Grid>
          {timer > 0 ? (
            <Grid container direction="row" className={classes.buttons}>
              <Grid>
                <Button
                  onClick={toggleTimer}
                  style={{
                    backgroundColor: '#5061a9',
                    color: 'white',
                    marginLeft: '4px',
                    marginBottom: '10px',
                    zIndex: 1,
                    position: 'relative',
                    top: '185px',
                    left: '185px',
                  }}
                >
                  pause
                </Button>
              </Grid>
              <Grid>
                <StopButton toggleTimer={toggleTimer} />
              </Grid>
            </Grid>
          ) : (
            <Button
              onClick={toggleTimer}
              disabled={sessionTime ? false : true}
              style={{
                backgroundColor: '#5061a9',
                color: 'white',
                marginLeft: '4px',
                marginBottom: '10px',
                zIndex: 1,
                position: 'relative',
                top: '185px',
              }}
            >
              Start
            </Button>
          )}
        </Grid>
        <Circle
          percent={(timer / targetTime) * 100}
          strokeWidth="3"
          strokeColor={{
            '0%': '#5061a9',
            '100%': '#5061a9',
          }}
          trailColor={primary.contrastText}
          style={{
            width: '100%',
            position: 'relative',
            bottom: '160px',
          }}
        />
      </Card>
    </div>
  );
};
export default connect(
  (state) => state,
  (dispatch) => {
    return {
      updateSession: (sessionId, sessionTime) =>
        dispatch(updateSession(sessionId, sessionTime)),
    };
  }
)(Stopwatch);

export { msToHMS };
