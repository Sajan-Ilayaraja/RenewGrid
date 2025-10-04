
import { initializeApp, getApps, getApp } from 'firebase/app';

const firebaseConfig = {
  "projectId": "microgrid-monitor-ioyh1",
  "appId": "1:638164840617:web:e1864171459aeeda0239b8",
  "storageBucket": "microgrid-monitor-ioyh1.firebasestorage.app",
  "apiKey": "AIzaSyBIpY8rwr9GuTeBE8okqcBP6DafKXz-3Vs",
  "authDomain": "microgrid-monitor-ioyh1.firebaseapp.com",
  "measurementId": "",
  "messagingSenderId": "638164840617"
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

export { app };
