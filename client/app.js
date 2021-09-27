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
  console.log('starting app.js');

  const classes = useStyles();
  const dispatch = useDispatch();
  const currentSession = useSelector((state) => state.currentSession);
  const [sessionTime, setSessionTime] = useState(0);
  const [goal, setGoal] = useState('');
  const [countDown, setCountDown] = useState(false);
  const [counter, setCounter] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const blackList = useSelector((state) => state.blackList);
  console.log('isActive:', isActive);
  console.log('sessionTime', sessionTime);
  console.log('counter:', counter);

  const auth = useSelector((state) => state.auth);
  const [intervalID, setIntervalID] = useState('');
  if (auth.id) {
    setStoredAuth(auth).then(getStoredAuth());
  }

  useEffect(() => {
    setCounter(sessionTime);
  }, [currentSession]);

  useEffect(() => {
    setCounter(sessionTime);
  }, [sessionTime]);

  useEffect(() => {
    let intervalId;

    if (isActive) {
      if (counter === 0) {
        setIsActive(false);
        dispatch(endSession(currentSession.id, true));
      }

      intervalId = setInterval(() => {
        setCounter((counter) => counter - 1000);
      }, 1000);
    }

    return () => clearInterval(intervalId);
  }, [isActive, counter]);

  // useEffect(() => {
  //   const timeLeft = localStorage.getItem('sessionTime');
  //   if (parseInt(timeLeft) < 0) return;
  //   if (!parseInt(timeLeft) && currentSession.id && countDown) {
  //     setStoredIsRunning(false);
  //   }
  // }, [sessionTime]);

  // useEffect(() => {
  //   if (window.localStorage.getItem('token')) {
  //     dispatch(me());
  //   }
  // }, [dispatch]);

  // useEffect(() => {
  //   if (timer === 0 && currentSession.id) {
  //     setCountDown(false);
  //     dispatch(endSession(currentSession.id, true));
  //   } else {
  //     console.log('timer:', timer);
  //   }
  // }, [timer]);

  useEffect(() => {
    console.log('blackList in app.js:', blackList);
    const blackListUser = blackList.filter((blackListItem) => {
      return blackListItem.userId === auth.id;
    });
    console.log("user's blackList in app.js:", blackListUser);
    const blackListUserUrls = blackListUser.map((blackListItem) => {
      return blackListItem.site.siteUrl;
    });
    setStoredBlackList(blackListUserUrls);
  }, [blackList]);

  // if (chrome.storage) {
  //   chrome.storage.onChanged.addListener((changes, areaName) => {
  //     console.log('changes:', changes);
  //     if (changes.timer) {
  //       chrome.storage.local.get(['timer'], (res) => {
  //         console.log('res.timer:', res.timer);
  //         if (res.timer !== null) {
  //           setTimer(res.timer);
  //         } else {
  //           console.log('res.timer in app.js:', res.timer);
  //           setTimer(timer - 1000);
  //         }
  //       });
  //     }
  //   });
  // }

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
