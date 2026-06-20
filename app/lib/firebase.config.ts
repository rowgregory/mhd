import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAiy6tuEQ6g7zVZHUjp6FXPqEoPDkVRmzg",
  authDomain: "mhd-custom.firebaseapp.com",
  projectId: "mhd-custom",
  storageBucket: "mhd-custom.firebasestorage.app",
  messagingSenderId: "86005606805",
  appId: "1:86005606805:web:c8101fbc8e64392111ae9c",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
