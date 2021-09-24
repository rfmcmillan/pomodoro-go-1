import React, { useEffect, useState, createContext } from 'react';
import Nav from './components/Nav';
import Routes from './routes';
import { makeStyles } from '@material-ui/core';
import { connect, useDispatch, useSelector } from 'react-redux';
import { me } from './store';
import { endSession } from './store/sessions';
import {
  setStoredBlackList,
  setStoredAuth,
  getStoredAuth,
  setStoredIsRunning,
} from './storage.js';

export const SessionContext = createContext();

const useStyles = makeStyles(() => ({
  main: {
    height: '100%',
    width: '100%',
  },
}));
const App = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const currentSession = useSelector((state) => state.currentSession);
  const [sessionTime, setSessionTime] = useState(0);
  const [goal, setGoal] = useState('');
  const [timer, setTimer] = useState(0);
  const [countDown, setCountDown] = useState(false);
  const blackList = useSelector((state) => state.blackList);
  const auth = useSelector((state) => state.auth);
  const [intervalID, setIntervalID] = useState('');

  if (blackList.length && auth) {
    const blackListAuth = blackList.filter((item) => {
      return item.userId === auth.id;
    });
    const blackListedSiteUrls = blackListAuth.map((item, index) => {
      return item.site.siteUrl;
    });
    setStoredBlackList(blackListedSiteUrls);
  }

  if (auth.id) {
    setStoredAuth(auth).then(getStoredAuth());
  }

  useEffect(() => {
    const timeLeft = localStorage.getItem('sessionTime');
    if (parseInt(timeLeft) < 0) return;
    if (!parseInt(timeLeft) && currentSession.id && countDown) {
      setStoredIsRunning(false);
      // props.endSession(currentSession.id, true);
    }
  }, [sessionTime]);

  useEffect(() => {
    if ((sessionTime, countDown)) {
      const id = setInterval(() => {
        setSessionTime((sessionTime) => {
          localStorage.setItem('sessionTime', sessionTime - 1000);
          return sessionTime - 1000;
        });
      }, 1000);
      setIntervalID(id);
    }
    if (!countDown) {
      clearInterval(intervalID);
      setSessionTime(0);
    }
  }, [dispatch]);

  useEffect(() => {
    if (window.localStorage.getItem('token')) {
      dispatch(me());
    }
  }, [dispatch]);

  useEffect(() => {
    console.log('timer in useEffect:', timer);
    if (timer === 0 && currentSession.id) {
      dispatch(endSession(currentSession.id, true));
    }
  }, [timer]);
  if (chrome.storage) {
    chrome.storage.onChanged.addListener((changes, areaName) => {
      if (changes.timer) {
        chrome.storage.local.get(['timer'], (res) => {
          setTimer(res.timer);
        });
      }
    });
  }

  return (
    <div className={classes.main}>
      <SessionContext.Provider
        value={{
          sessionTime,
          setSessionTime,
          goal,
          setGoal,
          countDown,
          setCountDown,
          intervalID,
          setIntervalID,
        }}
      >
        <Nav />
        <Routes timer={timer} />
      </SessionContext.Provider>
    </div>
  );
};

export default connect(null, (dispatch) => {
  return {
    endSession: (sessionId, successful) =>
      dispatch(endSession(sessionId, successful)),
  };
})(App);
