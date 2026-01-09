// sidepanel.js

// --- 1. FIREBASE CONFIGURATION (Integrated) ---
// Yes, for a Chrome Extension (Client-Side App), it is standard to have these here.
const firebaseConfig = {
  apiKey: "AIzaSyBq2GyZiDLeeSy8HtF7n81CSeayWCgPy9o",
  authDomain: "sentinel-ai-2025.firebaseapp.com",
  projectId: "sentinel-ai-2025",
  storageBucket: "sentinel-ai-2025.firebasestorage.app",
  messagingSenderId: "403179711268",
  appId: "1:403179711268:web:e9c4251dc4a82de81261b1"
};

// --- 2. INITIALIZE FIREBASE ---
// We use the global 'firebase' object because we loaded the scripts in sidepanel.html
let db = null;
try {
  // Initialize the app
  const app = firebase.initializeApp(firebaseConfig);
  // Get the database reference
  db = firebase.firestore();
  console.log("🔥 Firebase initialized successfully!");
} catch (e) {
  console.error("Firebase Connection Failed:", e);
}

// --- 3. UI ELEMENTS ---
const video = document.getElementById('video');
const statusDiv = document.getElementById('status');
const logsContainer = document.getElementById('logs-container');
const startBtn = document.getElementById('startBtn');
const recDot = document.getElementById('recDot');

// --- 4. LOGGING FUNCTION ---
function addLog(msg, type = "info") {
  const div = document.createElement('div');
  div.className = "log-item";
  
  // Format time (e.g., 10:30:05)
  const time = new Date().toLocaleTimeString('en-US', { hour12: false, hour: "numeric", minute: "numeric", second: "numeric" });
  const typeClass = type === "alert" ? "log-alert" : "log-info";
  
  div.innerHTML = `<span class="log-time">[${time}]</span><span class="${typeClass}">${msg}</span>`;
  logsContainer.prepend(div); // Add to top of list
}

// --- 5. LISTEN FOR CHEATING ALERTS ---
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === "CHEATING_ALERT") {
    // A. Update UI
    statusDiv.innerText = `⚠️ VIOLATION: ${request.msg}`;
    statusDiv.className = "status-badge status-danger";
    addLog(request.msg, "alert");

    // B. Send to Firebase (If connected)
    if (db) {
      db.collection("exams").doc("hackathon_session").collection("violations").add({
        violation: request.msg,
        timestamp: firebase.firestore.FieldValue.serverTimestamp() // Server time
      }).then(() => {
        console.log("Violations saved to Cloud DB");
      }).catch(err => {
        console.error("DB Save Error:", err);
      });
    }
  }
});

// --- 6. CAMERA & AI LOGIC ---
startBtn.addEventListener('click', async () => {
  startBtn.disabled = true;
  startBtn.innerText = "Initializing AI...";
  
  try {
    addLog("Loading Neural Networks...");
    // Load models from the local libs folder
    await faceapi.nets.tinyFaceDetector.loadFromUri('./libs');
    
    addLog("Requesting Camera Access...");
    const stream = await navigator.mediaDevices.getUserMedia({ video: {} });
    video.srcObject = stream;
    
    // UI Updates
    recDot.style.display = "block"; // Show red recording dot
    startBtn.innerText = "• Monitoring Active";
    statusDiv.innerText = "✅ Secure: Monitoring";
    statusDiv.className = "status-badge status-safe";
    
    // Start the AI Loop
    startDetection();

  } catch (err) {
    console.error(err);
    addLog("Error: " + err.message, "alert");
    startBtn.disabled = false;
    startBtn.innerText = "Retry Start";
  }
});

function startDetection() {
  video.addEventListener('play', () => {
    setInterval(async () => {
      // Run AI Detection on the video feed
      const options = new faceapi.TinyFaceDetectorOptions();
      const detections = await faceapi.detectAllFaces(video, options);
      
      // Analyze Results
      if (detections.length === 0) {
        statusDiv.innerText = "⚠️ NO FACE DETECTED";
        statusDiv.className = "status-badge status-danger";
      } else if (detections.length > 1) {
        statusDiv.innerText = "⚠️ MULTIPLE PEOPLE";
        statusDiv.className = "status-badge status-danger";
      } else {
        // If "Secure", only update if there isn't an active violation alert
        if (!statusDiv.innerText.includes("VIOLATION")) {
          statusDiv.innerText = "✅ Secure: User Verified";
          statusDiv.className = "status-badge status-safe";
        }
      }
    }, 1000); // Check once per second
  });
}
