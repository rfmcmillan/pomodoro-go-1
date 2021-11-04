'use strict';
const { storage, tabs, runtime, alarms } = chrome;
import { getStoredBlackList } from './storage';

chrome.action.onClicked.addListener((tab) => {
  tabs.create({
    url: 'index.html',
  });
});

const background = {
  active: false,
  sessionTime: 0,
  init: async function () {
    try {
      if (!this.active) {
        alarms.clearAll(() => {
          console.log('alarms are cleared');
        });
        this.listenForAlarm();
        this.active = true;
      }
    } catch (error) {
      console.log('issue with start up in background js', error);
    }
  },

  listenForAlarm: function () {
    return alarms.onAlarm.addListener(function (alarm) {
      if (alarm.name === 'startTimer') {
        chrome.notifications.create(
          undefined,
          {
            type: 'basic',
            title: 'Your focus session is complete!',
            message: 'Nice job! You deserve a break!',
            iconUrl: 'logo-pomo.png',
            requireInteraction: true,
            silent: false,
          },
          () => {
            console.log('last error: ', runtime.lastError);
          }
        );
        storage.local.set({
          alarmCreated: false,
          currentSession: {},
          timerOn: false,
          sessionTime: 0,
          sessionComplete: true,
        });
      }
    });
  },
};

background.init();

tabs.onUpdated.addListener(function async(tabId, changeInfo) {
  if (changeInfo.url) {
    getStoredBlackList().then((blackListUrls) => {
      if (blackListUrls) {
        for (let i = 0; i < blackListUrls.length; i++) {
          if (
            changeInfo.url.includes(blackListUrls[i]) &&
            blackListUrls[i].length
          ) {
            tabs.update(tabId, {
              url: `${process.env.API_URL}/blocked`,
            });
          }
        }
      }
    });
  }
});

let timerID;
let timerTime;

runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.cmd === 'START_TIMER') {
    timerTime = new Date(request.when);
    timerID = setTimeout(() => {
      chrome.alarms.create('startTimer', { when: Date.now() });
      timerTime = 0;
    }, timerTime.getTime() - Date.now());
  } else if (request.cmd === 'GET_TIME') {
    sendResponse({ time: timerTime });
  }
});
