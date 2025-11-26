import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
const firebaseConfig = {
apiKey: "AIzaSyAju0rZE2fZ43BewEVKLPbuMSKv8FqFsHo",
authDomain: "yugioh-b87b1.firebaseapp.com",
projectId: "yugioh-b87b1",
storageBucket: "yugioh-b87b1.firebasestorage.app",
messagingSenderId: "726344783902",
appId: "1:726344783902:web:ba013679e98e090304b60f",
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const db = getFirestore(app); // ✅ ¡Esto es necesario!
export { auth, db };