import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCMHqHJ21f2MS1xJKFWSTlBGTlhi3me__M",
    authDomain: "berlin-comics.firebaseapp.com",
    projectId: "berlin-comics",
    storageBucket: "berlin-comics.firebasestorage.app",
    messagingSenderId: "856496817608",
    appId: "1:856496817608:web:2313ee0dbe9ff061202cfd",
    measurementId: "G-RPT55GJ972"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);

export { analytics };
export default app;
