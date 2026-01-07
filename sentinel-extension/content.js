// content.js - Runs on the student's page
console.log("SentinelAI: Proctoring Active");

function report(msg) {
  // Send to Side Panel
  try {
    chrome.runtime.sendMessage({ type: "CHEATING_ALERT", msg: msg });
  } catch (e) {}
}

// BLOCKERS
document.addEventListener("copy", (e) => { e.preventDefault(); report("COPY_BLOCKED"); });
document.addEventListener("cut", (e) => { e.preventDefault(); report("CUT_BLOCKED"); });
document.addEventListener("paste", (e) => { e.preventDefault(); report("PASTE_BLOCKED"); });
document.addEventListener("contextmenu", (e) => { e.preventDefault(); report("RIGHT_CLICK_BLOCKED"); });

// LISTENERS
document.addEventListener("visibilitychange", () => {
  if (document.hidden) report("TAB_SWITCH_DETECTED");
});
window.addEventListener("blur", () => report("WINDOW_LOST_FOCUS"));