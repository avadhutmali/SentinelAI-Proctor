// background.js

// Enables the Side Panel to open when you click the extension icon
chrome.sidePanel
  .setPanelBehavior({ openPanelOnActionClick: true })
  .catch((error) => console.error(error));

console.log("SentinelAI Background Service Running");