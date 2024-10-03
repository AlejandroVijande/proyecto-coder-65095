import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDH5iTd2jiZ8F2mf-CW62NrxkWmhe1img4",
  authDomain: "ecommerce-music-world.firebaseapp.com",
  projectId: "ecommerce-music-world",
  storageBucket: "ecommerce-music-world.appspot.com",
  messagingSenderId: "921741333083",
  appId: "1:921741333083:web:9f135da139be162690257e"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
