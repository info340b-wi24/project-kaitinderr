import React from 'react';
import KpopGame from './components/KpopGame.js'; // Adjust the path as necessary
import SongList from './components/SongList.js';
import SongPage from './components/SongPage.js';
import NavBar from './components/NavBar.js';

function App(props) {
  return (
    <div className="App">
      <NavBar />
      <KpopGame songs={props.songData} />
      {/* <SongPage song={props.songData[0]} /> */}
      {/* <SongList songs={props.songData} /> */}
    </div>
  );
}

export default App;