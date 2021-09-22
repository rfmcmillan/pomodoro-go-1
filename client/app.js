import React, { useEffect, useState, createContext } from 'react';

import Nav from './components/Nav';
import Routes from './routes';
import { makeStyles } from '@material-ui/core';
import { connect, useDispatch, useSelector } from 'react-redux';
import { me } from './store';
import { endSession, removeSession } from './store/sessions';
import { setStoredBlackList, getStoredBlackList } from './storage.js';
import { setStoredAuth, getStoredAuth } from './storage.js';
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
  const [countDown, setCountDown] = useState(false);
  const blackList = useSelector((state) => state.blackList);
  const auth = useSelector((state) => state.auth);
  if (blackList.length && auth) {
    const blackListAuth = blackList.filter((item) => {
      return item.userId === auth.id;
    });

    const blackListedSiteUrls = blackListAuth.map((item, index) => {
      return item.site.siteUrl;
    });

    setStoredBlackList(blackListedSiteUrls).then(
      getStoredBlackList().then((blackList) => {})
    );
  }
  if (auth.id) {
    setStoredAuth(auth).then(getStoredAuth());
  }

  const [intervalID, setIntervalID] = useState('');
  useEffect(() => {
    const timeLeft = localStorage.getItem('sessionTime');
    if (parseInt(timeLeft) < 0) return;
    if (!parseInt(timeLeft) && currentSession.id && countDown) {
      console.log('props.endSession:', props.endSession);
      chrome.alarms.create('studyTimer', { when: 1000 });
      props.endSession(currentSession.id, true);
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
        <Routes />
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
