import React, { useEffect, useState, createContext } from 'react';
import Nav from './components/Nav';
import Routes from './routes';
import { makeStyles } from '@material-ui/core';
import { connect, useDispatch, useSelector } from 'react-redux';
import { endSession } from './store/sessions';
import { loadBlackLists } from './store/blackList';
import { me } from './store/auth';
import { setStoredBlackList, setStoredAuth, getStoredAuth } from './storage.js';

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
  const [counter, setCounter] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const blackList = useSelector((state) => state.blackList);
  const auth = useSelector((state) => state.auth);
  const [intervalID, setIntervalID] = useState('');

  if (auth.id) {
    setStoredAuth(auth).then(getStoredAuth());
  }

  useEffect(() => {
    dispatch(loadBlackLists());
    dispatch(me());
  }, []);

  useEffect(() => {
    setCounter(sessionTime);
  }, [currentSession]);

  useEffect(() => {
    setCounter(sessionTime);
  }, [sessionTime]);

  useEffect(() => {
    console.log('isActive:', isActive);
    console.log('counter:', counter);
    let intervalId;

    if (isActive) {
      if (counter === 0) {
        setIsActive(false);
        dispatch(endSession(currentSession.id, true));
        chrome.alarms.create('startTimer', { when: Date.now() });
      }

      intervalId = setInterval(() => {
        setCounter((counter) => counter - 1000);
      }, 1000);
    }

    return () => clearInterval(intervalId);
  }, [isActive, counter]);

  useEffect(() => {
    if (auth.id && blackList.length) {
      const blackListUser = blackList.filter((blackListItem) => {
        return (
          blackListItem.userId === auth.id &&
          blackListItem.blockingEnabled === true
        );
      });
      const blackListUserUrls = blackListUser.map((blackListItem) => {
        return blackListItem.site.siteUrl;
      });
      setStoredBlackList(blackListUserUrls);
    }
  }, [blackList, auth]);

  return (
    <div className={classes.main}>
      <SessionContext.Provider
        value={{
          sessionTime,
          setSessionTime,
          goal,
          setGoal,
          intervalID,
          setIntervalID,
          isActive,
          setIsActive,
        }}
      >
        {isActive ? '' : <Nav />}
        <Routes timer={counter} />
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
