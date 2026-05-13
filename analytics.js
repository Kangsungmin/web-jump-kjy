import { initializeApp } from 'https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js';
import { getAnalytics } from 'https://www.gstatic.com/firebasejs/11.1.0/firebase-analytics.js';

// ⚠️ Firebase Console → 프로젝트 설정 → 웹 앱 → SDK 구성에서 복사한 값을 입력하세요
const firebaseConfig = {
  apiKey:            "AIzaSyCxYWR7eMoMSD5oWgMjvFWcPLmnxVHMuPw",
  authDomain:        "web-jump-kjy.firebaseapp.com",
  projectId:         "web-jump-kjy",
  storageBucket:     "web-jump-kjy.firebasestorage.app",
  messagingSenderId: "950785095325",
  appId:             "1:950785095325:web:6dc3e6aad57d6e934c8674",
  measurementId:     "G-6PTFKMEV3M",
};

const app       = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
