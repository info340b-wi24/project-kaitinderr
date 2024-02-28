import React from 'react';
import KpopGame from './components/KpopGame.js'; // Adjust the path as necessary
import SongList from './components/SongList.js';
import SongPage from './components/SongPage.js';
import NavBar from './components/NavBar.js';
import Footer from './components/Footer.js';

function App(props) {
  return (
    <div className="App">
      <NavBar />
      {/* <KpopGame songs={props.songData} /> */}
      {/* <SongPage song={props.songData[2]} /> */}
      <SongList songs={props.songData} />
      <Footer />
    </div>
  );
}

export default App;