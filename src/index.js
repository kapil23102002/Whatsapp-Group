import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { initializeApp } from "firebase/app";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA4wUoUd_hL_Yu-kzqZWpOGjbY6joSjS9c",
  authDomain: "react-chat-app-8b00d.firebaseapp.com",
  databaseURL: "https://react-chat-app-8b00d-default-rtdb.firebaseio.com",
  projectId: "react-chat-app-8b00d",
  storageBucket: "react-chat-app-8b00d.appspot.com",
  messagingSenderId: "490685773394",
  appId: "1:490685773394:web:e92cd0ee0d325b6f20118b",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
