import { getFirestore } from "@firebase/firestore";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDeUTDlOC_NOHQUE_7GCsicmnoQAyxnQTU",
  authDomain: "todolist-project-28e36.firebaseapp.com",
  projectId: "todolist-project-28e36",
  storageBucket: "todolist-project-28e36.appspot.com",
  messagingSenderId: "835957724697",
  appId: "1:835957724697:web:d3c082968ac493570b7c88",
};

//initxw
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
