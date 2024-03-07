import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import KpopGame from './components/KpopGame.js'; // Adjust the path as necessary
import SongList from './components/SongList.js';
import SongPage from './components/SongPage.js';
import NavBar from './components/NavBar.js';
import Footer from './components/Footer.js';

function App(props) {
  return (
    <div className="App">
      <NavBar />
      <Routes>
          <Route index element={<SongList songs={props.songData} />} />
          <Route path="/GamePage" element={<KpopGame songs={props.songData} />} />
        </Routes>
      {/* <SongPage song={props.songData[2]} /> */}
      <Footer />
    </div>
  );
}

export default App;