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
import { endSession } from '../../store/sessions';

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
  const dispatch = useDispatch();
  const { isActive, setIsActive, sessionTime, setSessionTime } =
    useContext(SessionContext);
  const [timeLeft, setTimeLeft] = useState(0);
  const [localIsActive, setLocalIsActive] = useState(false);
  const displayTime = msToHMS(localIsActive ? timeLeft : sessionTime);
  const classes = useStyles();
  const theme = useTheme();
  const { primary } = theme.palette;
  const currentSession = useSelector((state) => state.currentSession);
  const { expectedEndTime, startTime } = currentSession;
  const end = Date.parse(expectedEndTime);
  const start = Date.parse(startTime);
  const [triggerEnd, setTriggerEnd] = useState(false);
  let intervalId;

  const targetTime = end - start;

  const toggleTimer = (ev) => {
    const button = ev.target.innerText;

    if (button === 'START') {
      updateSession(currentSession.id, { sessionTime });
      localStorage.setItem('currentSession', JSON.stringify(currentSession));
      setIsActive(true);
    }
  };

  ///timer test
  useEffect(() => {
    console.log('useEffect called');
    chrome.runtime.sendMessage({ cmd: 'GET_TIME' }, (response) => {
      console.log('response:', response);
      if (response.time) {
        const time = new Date(response.time);
        startTimer(time);
      }
    });
  }, []);

  function startTimer(time, sessionTime) {
    let n = 0;

    // setIsActive(true);
    console.log('time in startTimer:', time);
    setTimeLeft(sessionTime);
    intervalId = setInterval(() => {
      // display the remaining time
      console.log('time.getTime():', time.getTime(), 'Date.now():', Date.now());
      if (time.getTime() >= Date.now()) {
        console.log('timeLeft:', timeLeft);
        console.log('time:', n);
        n++;
        setTimeLeft((prevTimeLeft) => prevTimeLeft - 1000);
      } else {
        console.log('time.getTime():', time.getTime());
        setTimeLeft(0);
        setTriggerEnd(true);
      }
    }, 1000);
  }

  useEffect(() => {
    if (localIsActive) {
      console.log('sessionTime in useEffect:', sessionTime);
      startTimerInit(sessionTime);
      return () => clearInterval(intervalId);
    }
  }, [localIsActive]);

  useEffect(() => {
    console.log('timeLeft:', timeLeft);
  }, [timeLeft]);

  useEffect(() => {
    console.log('triggerEnd:', triggerEnd);
    if (triggerEnd && localIsActive) {
      console.log(triggerEnd, localIsActive);
      dispatch(endSession(currentSession.id, true));
      console.log('intervalId:', intervalId);
      clearInterval(intervalId);
      setLocalIsActive(false);
      setTriggerEnd(false);
      // setIsActive(false);
    }
  }, [triggerEnd]);

  function startTimerInit(sessionTime) {
    console.log('sessionTIme:', sessionTime);
    const now = Date.now();
    const timeToFinish = now + sessionTime;
    const timeDate = new Date(timeToFinish);
    chrome.runtime.sendMessage({ cmd: 'START_TIMER', when: timeDate });
    console.log('timeDate:', timeDate);
    updateSession(currentSession.id, { sessionTime });
    localStorage.setItem('currentSession', JSON.stringify(currentSession));
    startTimer(timeDate, sessionTime);
  }
  ////timer test end

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
          {localIsActive ? (
            <StopButton toggleTimer={toggleTimer} />
          ) : (
            <Button
              onClick={() => {
                setLocalIsActive(true);
              }}
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
          percent={
            ((localIsActive ? timeLeft : sessionTime) / sessionTime) * 100
          }
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
