import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import firebase from "firebase/compat/app";

const firebaseConfig = {
  apiKey: "AIzaSyDKW-sXbUyBNrbU9a-EYyba-co2COlxklU",
  authDomain: "test-8fa3b.firebaseapp.com",
  projectId: "test-8fa3b",
  storageBucket: "test-8fa3b.appspot.com",
  messagingSenderId: "385683380968",
  appId: "1:385683380968:web:11d74e4ec6b62f43e1475d",
};
firebase.initializeApp(firebaseConfig);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
