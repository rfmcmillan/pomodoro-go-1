import React, { useState, useContext, useEffect } from 'react';
import { Button, Typography, makeStyles, Card, Grid } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import { connect, useDispatch, useSelector } from 'react-redux';
import { updateSession } from '../../store/sessions';
import StopButton from './StopButton';
import { SessionContext } from '../../app';
import { Circle } from 'rc-progress';
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
  const { updateSession } = props;
  const dispatch = useDispatch();
  const { localIsActive, setLocalIsActive, sessionTime, setSessionTime } =
    useContext(SessionContext);
  const [timeLeft, setTimeLeft] = useState(0);
  // const [localIsActive, setLocalIsActive] = useState(false);
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

  useEffect(() => {
    chrome.runtime.sendMessage({ cmd: 'GET_TIME' }, (response) => {
      if (response.time) {
        const time = new Date(response.time);
        startTimer(time);
      }
    });
  }, []);

  const startTimer = (time, sessionTime) => {
    setTimeLeft(sessionTime);
    intervalId = setInterval(() => {
      if (time.getTime() >= Date.now()) {
        setTimeLeft((prevTimeLeft) => prevTimeLeft - 1000);
      } else {
        setTimeLeft(0);
        setTriggerEnd(true);
      }
    }, 1000);
  };

  useEffect(() => {
    if (localIsActive) {
      startTimerInit(sessionTime);
      return () => clearInterval(intervalId);
    }
  }, [localIsActive]);

  useEffect(() => {
    if (triggerEnd && localIsActive) {
      dispatch(endSession(currentSession.id, true));
      clearInterval(intervalId);
      setLocalIsActive(false);
      setTriggerEnd(false);
    }
  }, [triggerEnd]);

  function startTimerInit(sessionTime) {
    const now = Date.now();
    const timeToFinish = now + sessionTime;
    const timeDate = new Date(timeToFinish);
    chrome.runtime.sendMessage({ cmd: 'START_TIMER', when: timeDate });
    updateSession(currentSession.id, { sessionTime });
    localStorage.setItem('currentSession', JSON.stringify(currentSession));
    startTimer(timeDate, sessionTime);
  }

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
            <StopButton intervalId={intervalId} />
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
