chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  const reactionBtnSelector = request.action;

  if (reactionBtnSelector) {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const activeTab = tabs[0];
      chrome.scripting.executeScript({
        target: { tabId: activeTab.id },
        files: ['scripts/content.js'],
      });
    });
  }
});
