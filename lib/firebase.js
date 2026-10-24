import { initializeApp, getApps } from "firebase/app";
import { getAuth, setPersistence, browserLocalPersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Same Firebase project as AccuratKey, so one tqak account is the same account
// you use in AccuratKey. These values are public by design.
const cfg = {
  apiKey: "AIzaSyDRVjdj7VbgOQLdHIM_zUKhkLEunX_dZNM",
  authDomain: "accuratkey.firebaseapp.com",
  projectId: "accuratkey",
  appId: "1:1078720684864:web:ba923d63db84ba977d90a5",
};
const app = getApps().length ? getApps()[0] : initializeApp(cfg);
export const auth = getAuth(app);
export const db = getFirestore(app);
if (typeof window !== "undefined") setPersistence(auth, browserLocalPersistence).catch(() => {});
