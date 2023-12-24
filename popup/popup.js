document.getElementById('likeBtn').addEventListener('click', () => sendMessage('like'));
document.getElementById('loveBtn').addEventListener('click', () => sendMessage('love'));
document.getElementById('hahaBtn').addEventListener('click', () => sendMessage('haha'));
document.getElementById('wowBtn').addEventListener('click', () => sendMessage('wow'));
document.getElementById('sadBtn').addEventListener('click', () => sendMessage('sad'));
document.getElementById('angryBtn').addEventListener('click', () => sendMessage('angry'));

function sendMessage(reaction) {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const currentTab = tabs[0];
    if (currentTab.url.includes('facebook.com')) {
      chrome.storage.local.set({ currentReaction: reaction }, function () {
        console.log(`Stored reaction: ${reaction}`);
      });
      chrome.runtime.sendMessage({ action: reaction });
    } else {
      console.log("Not a Facebook URL. Action not sent.");
    }
  });
}
