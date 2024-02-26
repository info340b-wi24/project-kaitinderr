import React from 'react';
import KpopGame from './components/KpopGame.js'; // Adjust the path as necessary
import SongList from './components/SongList.js';
import SongPage from './components/SongPage.js';

function App(props) {
  return (
    <div className="App">
      {/* <KpopGame /> */}
      {/* <SongPage song={props.songData[0]} /> */}
      <SongList songs={props.songData} />
    </div>
  );
}

export default App;