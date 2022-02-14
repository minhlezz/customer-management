import { initializeApp } from "firebase/app";

const FIREBASE_API_KEY = "AIzaSyB9ZAaefykqozo-9OR6DypqMfflJIviJ5U";
const FIREBASE_API_PROJECT_ID = "store-application-7e974";

const firebaseConfig = {
  apiKey: FIREBASE_API_KEY,
  authDomain: FIREBASE_API_PROJECT_ID,
  databaseURL: `https://${FIREBASE_API_PROJECT_ID}-default-rtdb.asia-southeast1.firebasedatabase.app/`,
  projectId: FIREBASE_API_PROJECT_ID,
};

const app = initializeApp(firebaseConfig);

export { app };
