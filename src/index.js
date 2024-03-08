import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';

import SONG_DATA from './data/songs.json';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC0udIGu6B2Nth1M9GwnFiUE0nZjVkqIh8",
  authDomain: "mangomusic-64e1e.firebaseapp.com",
  databaseURL: "https://mangomusic-64e1e-default-rtdb.firebaseio.com",
  projectId: "mangomusic-64e1e",
  storageBucket: "mangomusic-64e1e.appspot.com",
  messagingSenderId: "218225259976",
  appId: "1:218225259976:web:b903ff024be3cf4f0d7cfd"
};

// Initialize Firebase
initializeApp(firebaseConfig);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <App songData={SONG_DATA}/>
    </BrowserRouter>
  </React.StrictMode>
);