'use strict';
const { storage, tabs, runtime, alarms, scripting } = chrome;
import { getStoredBlackList } from './storage';

chrome.action.onClicked.addListener((tab) => {
  chrome.tabs.create({
    url: 'index.html',
  });
});

const background = {
  active: false,
  currentTab: null,
  sessionTime: 0,
  appStarted: false,
  getCurrentTab: async function () {
    let queryOptions = { active: true, currentWindow: true };
    let [tab] = await chrome.tabs.query(queryOptions);
    return tab;
  },
  init: async function () {
    try {
      if (!this.active) {
        console.log('running app!');
        storage.sync.clear();
        alarms.clearAll(() => {
          console.log('alarms are cleared');
        });

        this.listenForAlarm();
        this.listenToExternalMessages();
        this.listenToStorage();
        this.listenToTabs();
        this.listenForBlockedSite();
        this.listenForDashboardRedirect();
        this.active = true;
      }
      this.currentTab = await this.getCurrentTab();
    } catch (error) {
      console.log('issue with start up in background js', error);
    }
  },
  createAlarm: function () {
    chrome.alarms.create('timer', {
      when: Date.now() + this.sessionTime,
    });
    this.alarmCreated = true;
    chrome.storage.sync.set({ alarmCreated: true });
  },
  resetStorage() {
    storage.local.set({
      sessionTime: 0,
      timerOn: false,
      currentSession: {},
      alarmCreated: false,
      sessionComplete: false,
      user: {},
      email: '',
    });
  },

  listenToExternalMessages: function () {
    return runtime.onMessageExternal.addListener(
      async (message, sender, sendResponse) => {
        try {
          if (message.message === 'create-timer') {
            this.sessionTime = message.sessionTime;
            this.createAlarm();
          }
          if (message.message === 'continue-alarm') {
            console.log('you want me to start an alarm?');
            alarms.clearAll(() => {
              console.log('alarms are cleared again');
              alarms.create('timer', {
                when: Date.now() + message.sessionTime,
              });
              console.log('new alarm created');
            });
          }
          if (message.message === 'timer-done') {
            alarms.create('timer', { when: Date.now() });
          }
          if (message.message === 'set-blocked-sites') {
            console.log('set-blocked-sites message received');
            const sites = [];
            message.blockedSites.forEach((site) => {
              sites.push(site.siteUrl);
            });
            chrome.storage.sync.set(
              { blocked: sites, currUser: message.currUser },
              () => {
                console.log('sites are blocked in chrome');
              }
            );
            console.log('blocked sites', message);
            chrome.storage.sync.get(null, (results) => {
              console.log('current chrome storage', results);
            });
          }
          if (message.message === 'toggle-block-or-not') {
            chrome.storage.sync.get(['blocked'], (results) => {
              const doesItExist = results.blocked.find((url) => {
                return url === message.toggleSite;
              });
              if (doesItExist) {
                const update = results.blocked.filter((each) => {
                  return each !== message.toggleSite;
                });
                chrome.storage.sync.set({ blocked: update });
              } else {
                results.blocked.push(message.toggleSite);
                chrome.storage.sync.set({ blocked: results.blocked });
              }
            });
          }
        } catch (error) {
          console.log(error);
        }
      }
    );
  },
  listenToStorage: function () {
    return storage.onChanged.addListener(async function (changes, namespace) {
      // logging out the changes in storage
      // THIS CODE IS FOR DEV PURPOSES
      // YOU WILL HAVE ALOT OF LOGS IN CONSOLE
      for (let [key, { oldValue, newValue }] of Object.entries(changes)) {
        console.log(
          `Storage key "${key}" in namespace "${namespace}" changed.`,
          `Old value was "${JSON.stringify(
            oldValue
          )}", new value is "${JSON.stringify(newValue)}".`
        );
      }
    });
  },
  listenToTabs: function () {
    return tabs.onUpdated.addListener(function (tabId, changeInfo) {
      console.log('listening to tabs, tabID', tabId);
      chrome.tabs.query({ active: false }, (tabs) => {
        let tab = tabs.reduce((previous, current) => {
          return previous.lastAccessed > current.lastAccessed
            ? previous
            : current;
        });
      });
      chrome.storage.sync.get(null, (results) => {
        const {
          currentSession,
          alarmCreated,
          sessionComplete,
          sessionTime,
          timerOn,
        } = results;
        const url = changeInfo.pendingUrl || changeInfo.url;
        if (!url || !url.startsWith('http')) {
          return;
        }
        const hostname = new URL(url).hostname;

        storage.sync.set({ userAttempt: hostname });

        storage.sync.get(['blocked', 'currUser'], async function (sync) {
          const { blocked, currUser } = sync;
          if (
            Array.isArray(blocked) &&
            blocked.find((domain) => {
              return domain.includes(hostname);
            })
          ) {
            const options = {
              method: 'post',
              headers: {
                'Content-type':
                  'application/x-www-form-urlencoded; charset=UTF-8',
              },
              body: `userAttempted=${hostname}&userId=${currUser}`,
            };

            try {
              await fetch(
                'https://pomodoro-go-1.herokuapp.com/api/blocks',
                options
              );
            } catch (err) {
              console.error('Request failed', err);
            }

            chrome.tabs.update(tabId, {
              url: 'https://pomodoro-go-1.herokuapp.com/uhoh',
            }); // hard-code it to production url atm instead of 'http://localhost:8080/uhoh'
          }
        });
      });
    });
  },

  listenForBlockedSite: function () {
    return chrome.tabs.onUpdated.addListener(function async(tabId, changeInfo) {
      if (changeInfo.url) {
        const hostname = new URL(url).hostname;
        console.log(hostname);
        getStoredBlackList().then((blackList) => {
          if (blackList) {
            if (blackList.includes(changeInfo.url)) {
              chrome.tabs.update(tabId, {
                url: `${process.env.API_URL}/uhoh`,
              });
            }
          }
        });
      }
    });
  },

  listenForAlarm: function () {
    return chrome.alarms.onAlarm.addListener(function (alarm) {
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
          console.log('last error: ', chrome.runtime.lastError);
        }
      );
      chrome.storage.local.set({
        alarmCreated: false,
        currentSession: {},
        timerOn: false,
        sessionTime: 0,
        sessionComplete: true,
      });
    });
  },
  listenForDashboardRedirect: function () {
    // THIS BUTTON WORKS BUT DASHBOARD DOES NOT LOAD
    return chrome.notifications.onButtonClicked.addListener(
      async (notificationId, buttonIdx) => {
        // redirects to dashboard after session is complete
        let tab = await this.getCurrentTab();
        chrome.tabs.update(tab.id, {
          url: 'https://pomodoro-go-1.herokuapp.com/dashboard',
        });
      }
    );
  },
};

background.init();
