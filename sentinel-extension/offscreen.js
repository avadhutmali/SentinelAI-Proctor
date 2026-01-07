import {
  FaceLandmarker,
  FilesetResolver
} from "./libs/vision_bundle.js";

const video = document.getElementById("webcam");
let faceLandmarker = undefined;
let lastVideoTime = -1;
let lastViolationTime = 0;

async function loadModel() {
  // We still load the WASM (helper files) from the URL. 
  // Chrome ALLOWS this because it is treated as "Data/Resources", not "Code Script".
  const filesetResolver = await FilesetResolver.forVisionTasks(
    "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.0/wasm"
  );

  faceLandmarker = await FaceLandmarker.createFromOptions(filesetResolver, {
    baseOptions: {
      modelAssetPath: `https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task`,
      delegate: "GPU"
    },
    outputFaceBlendshapes: true,
    runningMode: "VIDEO",
    numFaces: 2
  });

  console.log("✅ SentinelAI: Model Loaded!");
  startCamera();
}

// --- 2. Start the Camera ---
async function startCamera() {
  const stream = await navigator.mediaDevices.getUserMedia({ video: true });
  video.srcObject = stream;
  video.addEventListener("loadeddata", predictLoop);
}

// --- 3. The Loop (Runs 30 times a second) ---
async function predictLoop() {
  if (!faceLandmarker) return;

  let startTimeMs = performance.now();
  
  if (video.currentTime !== lastVideoTime) {
    lastVideoTime = video.currentTime;
    
    // DETECT FACES
    const result = faceLandmarker.detectForVideo(video, startTimeMs);

    // --- RULE A: No Face Detected ---
    if (result.faceLandmarks.length === 0) {
      handleViolation("NO_FACE_DETECTED");
    } 
    
    // --- RULE B: Multiple Faces ---
    else if (result.faceLandmarks.length > 1) {
      handleViolation("MULTIPLE_FACES_DETECTED");
    } 
    
    // --- RULE C: Looking Away (Gaze Tracking) ---
    else {
      // We check the "Blendshapes" (muscle movements)
      const shapes = result.faceBlendshapes[0].categories;
      
      // Find the score for looking left/right
      const lookLeft = shapes.find(s => s.categoryName === 'eyeLookInLeft')?.score || 0;
      const lookRight = shapes.find(s => s.categoryName === 'eyeLookInRight')?.score || 0;

      // Threshold: 0.0 to 1.0 (Adjust this if it's too sensitive)
      if (lookLeft > 0.6) handleViolation("LOOKING_LEFT");
      if (lookRight > 0.6) handleViolation("LOOKING_RIGHT");
    }
  }

  // Keep looping
  requestAnimationFrame(predictLoop);
}

// --- 4. Send Alert to Background (with Debounce) ---
function handleViolation(type) {
  const now = Date.now();
  // Only send 1 violation every 3 seconds to avoid spamming
  if (now - lastViolationTime > 3000) {
    lastViolationTime = now;
    
    console.log("🚨 Violation:", type);
    
    // Send to Background Script (which sends to Firebase)
    chrome.runtime.sendMessage({
      action: "LOG_VIOLATION",
      type: type
    });
  }
}

// Kick it off!
loadModel();