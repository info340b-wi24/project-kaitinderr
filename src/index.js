import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import SONG_DATA from './data/songs.json';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App songData={SONG_DATA}/>
  </React.StrictMode>
);