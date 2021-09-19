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
