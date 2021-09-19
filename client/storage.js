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
