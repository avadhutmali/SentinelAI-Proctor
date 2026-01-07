// sentinel-extension/firebase-config.js

// 1. Use Full CDN URLs instead of package names
// 2. Your Configuration
const firebaseConfig = {
  apiKey: "AIzaSyBq2GyZiDLeeSy8HtF7n81CSeayWCgPy9o",
  authDomain: "sentinel-ai-2025.firebaseapp.com",
  projectId: "sentinel-ai-2025",
  storageBucket: "sentinel-ai-2025.firebasestorage.app",
  messagingSenderId: "403179711268",
  appId: "1:403179711268:web:e9c4251dc4a82de81261b1"
};

const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// If you need to export them for other files:
export { db };