export function setStoredBlackList(blackList) {
  const vals = {
    blackList,
  };
  return new Promise((resolve) => {
    chrome.storage.local.set(vals, () => {
      resolve();
    });
  });
}

export function getStoredBlackList() {
  return new Promise((resolve) => {
    chrome.storage.local.get(['blackList'], (res) => {
      resolve(res.blackList);
    });
  });
}

export function setStoredIsRunning(isRunning) {
  chrome.storage.local.set({ isRunning });
}

export function getStoredIsRunning() {
  chrome.storage.local.get(['isRunning'], (res) => {
    resolve(res.isRunning);
  });
}

export function setStoredTimer(timer) {
  const vals = {
    timer,
  };
  return new Promise((resolve) => {
    chrome.storage.local.set(vals, () => {
      resolve();
    });
  });
}

export function getStoredTimer() {
  chrome.storage.local.get(['timer'], (res) => {
    resolve(res.timer);
  });
}

export function setStoredDisplayTime(displayTime) {
  const vals = {
    displayTime,
  };
  return new Promise((resolve) => {
    chrome.storage.local.set(vals, () => {
      resolve();
    });
  });
}

export function getStoredDisplayTime() {
  chrome.storage.local.get(['displayTime'], (res) => {
    resolve(res.displayTime);
  });
}

export function setStoredAuth(auth) {
  const vals = {
    auth,
  };
  return new Promise((resolve) => {
    chrome.storage.local.set(vals, () => {
      resolve();
    });
  });
}

export function getStoredAuth() {
  return new Promise((resolve) => {
    chrome.storage.local.get(['auth'], (res) => {
      resolve(res.auth);
    });
  });
}
