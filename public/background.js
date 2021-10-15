/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./client/storage.js":
/*!***************************!*\
  !*** ./client/storage.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "setStoredBlackList": () => (/* binding */ setStoredBlackList),
/* harmony export */   "getStoredBlackList": () => (/* binding */ getStoredBlackList),
/* harmony export */   "setStoredIsRunning": () => (/* binding */ setStoredIsRunning),
/* harmony export */   "getStoredIsRunning": () => (/* binding */ getStoredIsRunning),
/* harmony export */   "setStoredTimer": () => (/* binding */ setStoredTimer),
/* harmony export */   "getStoredTimer": () => (/* binding */ getStoredTimer),
/* harmony export */   "setStoredDisplayTime": () => (/* binding */ setStoredDisplayTime),
/* harmony export */   "getStoredDisplayTime": () => (/* binding */ getStoredDisplayTime),
/* harmony export */   "setStoredAuth": () => (/* binding */ setStoredAuth),
/* harmony export */   "getStoredAuth": () => (/* binding */ getStoredAuth)
/* harmony export */ });
function setStoredBlackList(blackList) {
  const vals = {
    blackList
  };
  return new Promise(resolve => {
    chrome.storage.local.set(vals, () => {
      resolve();
    });
  });
}
function getStoredBlackList() {
  return new Promise(resolve => {
    chrome.storage.local.get(['blackList'], res => {
      resolve(res.blackList);
    });
  });
}
function setStoredIsRunning(isRunning) {
  chrome.storage.local.set({
    isRunning
  });
}
function getStoredIsRunning() {
  chrome.storage.local.get(['isRunning'], res => {
    resolve(res.isRunning);
  });
}
function setStoredTimer(timer) {
  const vals = {
    timer
  };
  return new Promise(resolve => {
    chrome.storage.local.set(vals, () => {
      resolve();
    });
  });
}
function getStoredTimer() {
  chrome.storage.local.get(['timer'], res => {
    resolve(res.timer);
  });
}
function setStoredDisplayTime(displayTime) {
  const vals = {
    displayTime
  };
  return new Promise(resolve => {
    chrome.storage.local.set(vals, () => {
      resolve();
    });
  });
}
function getStoredDisplayTime() {
  chrome.storage.local.get(['displayTime'], res => {
    resolve(res.displayTime);
  });
}
function setStoredAuth(auth) {
  const vals = {
    auth
  };
  return new Promise(resolve => {
    chrome.storage.local.set(vals, () => {
      resolve();
    });
  });
}
function getStoredAuth() {
  return new Promise(resolve => {
    chrome.storage.local.get(['auth'], res => {
      resolve(res.auth);
    });
  });
}

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!******************************!*\
  !*** ./client/background.js ***!
  \******************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _storage__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./storage */ "./client/storage.js");


const {
  storage,
  tabs,
  runtime,
  alarms
} = chrome;

chrome.action.onClicked.addListener(tab => {
  chrome.tabs.create({
    url: 'index.html'
  });
});
const background = {
  active: false,
  currentTab: null,
  sessionTime: 0,
  appStarted: false,
  getCurrentTab: async function () {
    let queryOptions = {
      active: true,
      currentWindow: true
    };
    let [tab] = await chrome.tabs.query(queryOptions);
    return tab;
  },
  init: async function () {
    try {
      if (!this.active) {
        storage.sync.clear();
        alarms.clearAll(() => {
          console.log('alarms are cleared');
        });
        this.listenForAlarm();
        this.listenToExternalMessages();
        this.listenToStorage();
        this.listenToTabs();
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
      when: Date.now() + this.sessionTime
    });
    this.alarmCreated = true;
    chrome.storage.sync.set({
      alarmCreated: true
    });
  },

  resetStorage() {
    storage.local.set({
      sessionTime: 0,
      timerOn: false,
      currentSession: {},
      alarmCreated: false,
      sessionComplete: false,
      user: {},
      email: ''
    });
  },

  listenToExternalMessages: function () {
    return runtime.onMessageExternal.addListener(async (message, sender, sendResponse) => {
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
              when: Date.now() + message.sessionTime
            });
            console.log('new alarm created');
          });
        }

        if (message.message === 'timer-done') {
          alarms.create('timer', {
            when: Date.now()
          });
        }

        if (message.message === 'set-blocked-sites') {
          console.log('set-blocked-sites message received');
          const sites = [];
          message.blockedSites.forEach(site => {
            sites.push(site.siteUrl);
          });
          chrome.storage.sync.set({
            blocked: sites,
            currUser: message.currUser
          }, () => {
            console.log('sites are blocked in chrome');
          });
          console.log('blocked sites', message);
          chrome.storage.sync.get(null, results => {
            console.log('current chrome storage', results);
          });
        }

        if (message.message === 'toggle-block-or-not') {
          chrome.storage.sync.get(['blocked'], results => {
            const doesItExist = results.blocked.find(url => {
              return url === message.toggleSite;
            });

            if (doesItExist) {
              const update = results.blocked.filter(each => {
                return each !== message.toggleSite;
              });
              chrome.storage.sync.set({
                blocked: update
              });
            } else {
              results.blocked.push(message.toggleSite);
              chrome.storage.sync.set({
                blocked: results.blocked
              });
            }
          });
        }
      } catch (error) {
        console.log(error);
      }
    });
  },
  listenToStorage: function () {
    return storage.onChanged.addListener(async function (changes, namespace) {
      for (let [key, {
        oldValue,
        newValue
      }] of Object.entries(changes)) {
        console.log(`Storage key "${key}" in namespace "${namespace}" changed.`, `Old value was "${JSON.stringify(oldValue)}", new value is "${JSON.stringify(newValue)}".`);
      }
    });
  },
  listenToTabs: function () {
    return tabs.onUpdated.addListener(function (tabId, changeInfo) {
      chrome.tabs.query({
        active: false
      }, tabs => {
        let tab = tabs.reduce((previous, current) => {
          return previous.lastAccessed > current.lastAccessed ? previous : current;
        });
      });
      chrome.storage.sync.get(null, results => {
        const {
          currentSession,
          alarmCreated,
          sessionComplete,
          sessionTime,
          timerOn
        } = results;
        const url = changeInfo.pendingUrl || changeInfo.url;

        if (!url || !url.startsWith('http')) {
          return;
        }

        const hostname = new URL(url).hostname;
        storage.sync.set({
          userAttempt: hostname
        });
        storage.sync.get(['blocked', 'currUser'], async function (sync) {
          const {
            blocked,
            currUser
          } = sync;

          if (Array.isArray(blocked) && blocked.find(domain => {
            return domain.includes(hostname);
          })) {
            const options = {
              method: 'post',
              headers: {
                'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
              },
              body: `userAttempted=${hostname}&userId=${currUser}`
            };

            try {
              await fetch('https://pomodoro-go-1.herokuapp.com/api/blocks', options);
            } catch (err) {
              console.error('Request failed', err);
            }

            chrome.tabs.update(tabId, {
              url: 'https://pomodoro-go-1.herokuapp.com/uhoh'
            }); // hard-code it to production url atm instead of 'http://localhost:8080/uhoh'
          }
        });
      });
    });
  },
  listenForAlarm: function () {
    return chrome.alarms.onAlarm.addListener(function (alarm) {
      if (alarm.name === 'startTimer') {
        chrome.notifications.create(undefined, {
          type: 'basic',
          title: 'Your focus session is complete!',
          message: 'Nice job! You deserve a break!',
          iconUrl: 'logo-pomo.png',
          requireInteraction: true,
          silent: false
        }, () => {
          console.log('last error: ', chrome.runtime.lastError);
        });
        chrome.storage.local.set({
          alarmCreated: false,
          currentSession: {},
          timerOn: false,
          sessionTime: 0,
          sessionComplete: true
        });
      }
    });
  },
  listenForDashboardRedirect: function () {
    // THIS BUTTON WORKS BUT DASHBOARD DOES NOT LOAD
    return chrome.notifications.onButtonClicked.addListener(async (notificationId, buttonIdx) => {
      // redirects to dashboard after session is complete
      let tab = await this.getCurrentTab();
      chrome.tabs.update(tab.id, {
        url: 'https://pomodoro-go-1.herokuapp.com/dashboard'
      });
    });
  }
};
background.init();
chrome.tabs.onUpdated.addListener(function async(tabId, changeInfo) {
  if (changeInfo.url) {
    (0,_storage__WEBPACK_IMPORTED_MODULE_0__.getStoredBlackList)().then(blackListUrls => {
      if (blackListUrls) {
        for (let i = 0; i < blackListUrls.length; i++) {
          if (changeInfo.url.includes(blackListUrls[i]) && blackListUrls[i].length) {
            chrome.tabs.update(tabId, {
              url: `${"http://localhost:8080"}/uhoh`
            });
          }
        }
      }
    });
  }
});
})();

/******/ })()
;
//# sourceMappingURL=background.js.map