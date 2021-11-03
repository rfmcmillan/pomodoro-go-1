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
  tabs.create({
    url: 'index.html'
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
        chrome.notifications.create(undefined, {
          type: 'basic',
          title: 'Your focus session is complete!',
          message: 'Nice job! You deserve a break!',
          iconUrl: 'logo-pomo.png',
          requireInteraction: true,
          silent: false
        }, () => {
          console.log('last error: ', runtime.lastError);
        });
        storage.local.set({
          alarmCreated: false,
          currentSession: {},
          timerOn: false,
          sessionTime: 0,
          sessionComplete: true
        });
      }
    });
  }
};
background.init();
tabs.onUpdated.addListener(function async(tabId, changeInfo) {
  if (changeInfo.url) {
    (0,_storage__WEBPACK_IMPORTED_MODULE_0__.getStoredBlackList)().then(blackListUrls => {
      if (blackListUrls) {
        for (let i = 0; i < blackListUrls.length; i++) {
          if (changeInfo.url.includes(blackListUrls[i]) && blackListUrls[i].length) {
            tabs.update(tabId, {
              url: `${"http://localhost:8080"}/blocked`
            });
          }
        }
      }
    });
  }
}); ////////////////// Timer Test

let timerID;
let timerTime;
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log('request:', request);

  if (request.cmd === 'START_TIMER') {
    console.log('request.cmd === START_TIMER');
    timerTime = new Date(request.when);
    timerID = setTimeout(() => {
      // the time is app, alert the user.
      console.log('timer is finished');
    }, timerTime.getTime() - Date.now());
  } else if (request.cmd === 'GET_TIME') {
    sendResponse({
      time: timerTime
    });
  }
});
})();

/******/ })()
;
//# sourceMappingURL=background.js.map