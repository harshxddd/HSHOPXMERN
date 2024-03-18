// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAil3rebeL2GqrT7l1ym9Yzna6iv_MP7FM",
  authDomain: "shop-159a1.firebaseapp.com",
  projectId: "shop-159a1",
  storageBucket: "shop-159a1.appspot.com",
  messagingSenderId: "49970487822",
  appId: "1:49970487822:web:04e78156ed277514a9125f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app